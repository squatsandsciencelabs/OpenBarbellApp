import regression from 'regression';

import * as SetUtils from 'app/utility/SetUtils';
import * as DateUtils from 'app/utility/DateUtils';
import * as CollapsedMetrics from 'app/math/CollapsedMetrics';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as RepDataMap from 'app/utility/RepDataMap';

// TODO: make this formula work with metric types as it currently assumes it's just a number

// returns an object with:
//   e1RM as a number or null
//   r2 as a number or null
//   regression as a [] of points representing the regression line
//   errors as [] of ? representing bad points
//   unused as [] of ? representing unused points
//   active as [] of ? representing points used for the regression calculation
//   minX
//   maxX
//   maxY
//   slope
//   isRegressionNegative for if the regression is actually a negative slope
export const calculate1RM = (exercise, tagsToInclude, tagsToExclude, daysRange, velocity, metric, allSets) => {
    let errors = [];
    let unused = [];
    let active = [];

    // Step 1: Extract a chronological pool of relevant (check all sets against rep/weight/tag/date/exercise check)
    let pool = getSetsFor1RM(exercise, tagsToInclude, tagsToExclude, daysRange, velocity, allSets);

    // Step 2A: Remove based on ROM Check
    const romResults = romCheck(pool);
    errors.push(...romResults.failed);
    pool = romResults.passed;

    // Step 2B: Remove based on Weight Check

    // Step 2C: Remove based on Velocity Check
    const velocityResults = velocityCheck(pool);
    errors.push(...velocityResults.failed);
    pool = velocityResults.passed;

    // Step 3A: Cherry pick a single Set per Workout per Weight
    const workouts = splitByWorkoutAndWeight(pool);
    const cherryPickResults = cherryPick(workouts);
    unused.push(...cherryPickResults.failed);
    pool = cherryPickResults.passed;

    // Step 3B: Thin sets based on predefined "Buckets" of weights
    const thinResults = thinSets(pool);
    unused.push(...thinResults.failed);
    active.push(...thinResults.passed);

    // Step 4A: Convert into chart points
    // TODO: marker shouldn't be passed in via the calculator as it's not a calculated value, it's display only
    // Right now doing so for simplicity and to avoid extra loops
    // TODO: this should handle KGs or LBs
    // NOTE: workoutID is passed here to reduce the amount of searching necessary each time you tap, but it is a bit odd
    let activeConversion = convertToChartData(active, metric);
    let errorConversion = convertToChartData(errors, metric, true, true);
    let unusedConversion = convertToChartData(unused, metric, false);

    // Step 4B: Sort by weight
    let activeChartData = activeConversion.data.sort((a, b) => a.x - b.x);
    let errorChartData = errorConversion.data.sort((a, b) => a.x - b.x);
    let unusedChartData = unusedConversion.data.sort((a, b) => a.x - b.x);

    // Step 4C: calculate min max
    let minXArray = [activeConversion.minX, errorConversion.minX, unusedConversion.minX].filter((x) => x !== null);
    if (minXArray.length <= 0) {
        var minX = 0;
    } else {
        var minX = Math.min(...minXArray);
    }
    let minYArray = [activeConversion.minY, errorConversion.minY, unusedConversion.minY].filter((y) => y !== null);
    if (minYArray.length <= 0) {
        var minY = 0;
    } else {
        var minY = Math.min(...minYArray);
    }
    const maxX = Math.max(activeConversion.maxX, errorConversion.maxX, unusedConversion.maxX);
    const maxY = Math.max(activeConversion.maxY, errorConversion.maxY, unusedConversion.maxY);

    // Step 5: Calculate Regression
    const exerciseData = activeChartData.map((point) => {
        return [point.x, point.y];
    });
    const regressionResults = calculateRegression(exerciseData, velocity);
    const slope = calcSlope(regressionResults.regressionPoints);
    const isRegressionNegative = hasNegativeSlope(regressionResults.regressionPoints);
    const yInt = velocityAt0Weight(regressionResults.regressionPoints);
    const xInt = highestWeightPossible(regressionResults.regressionPoints);
    if (yInt !== null && xInt !== null) {
        var regressionPoints = [
            {x: 0, y: yInt},
            {x: xInt, y: 0}
        ];
    } else {
        var regressionPoints = [null, null];
    }

    // return
    return {
        e1RM: regressionResults.e1RM,
        r2: regressionResults.r2,
        active: activeChartData,
        errors: errorChartData,
        unused: unusedChartData,
        regressionPoints: regressionPoints,
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY,
        slope: slope,
        isRegressionNegative: isRegressionNegative,
    };
};

const convertToChartData = (array, metric, displayMarker=true, wasError=false) => {
    let minX = null;
    let maxX = null;
    let minY = null;
    let maxY = null;
    let data = array.map((set) => {
        if (metric === 'lbs') {
            var weight = SetUtils.weightInLBs(set);
        } else {
            var weight = SetUtils.weightInKGs(set);
        }
        const x = parseFloat(weight);
        const y = SetUtils.getFastestUsableAvgVelocity(set);
        if (displayMarker) {
            var marker = SetUtils.markerDisplayValue(set, metric);
        } else {
            var marker = '';
        }

        // x
        if (minX === null) {
            minX = x;
            maxX = x;
        } else {
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
        }

        // y
        if (maxY === null) {
            minY = y;
            maxY = y;
        } else {
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        }

        return {x: x, y: y, marker: marker, setID: set.setID, workoutID: set.workoutID, wasError: wasError };
    });

    return {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY,
        data: data,
    };
};

// DATA POINTS

// returns [] of usable sets
const getSetsFor1RM = (exercise, tagsToInclude, tagsToExclude, daysRange, velocity, allSets) => {
    let data = [];

    // parse it out
    allSets.forEach((set) => {
        if (isValidFor1RMCalc(set, exercise, tagsToInclude, tagsToExclude, daysRange)) {
            data.push(set);
        }
    });

    return data;
};

// returns an object with:
//   failed as [] of sets representing bad sets
//   passed as [] of sets representing the set that passed
const romCheck = (pool) => {
    let failed = [];
    let passed0Check = [];
    let passed = [];
    let roms = [];

    // ROM 0 check and obtain array of all ROMs
    pool.forEach((set) => {
        var hasFailedROM = false;

        SetUtils.validUnremovedReps(set).forEach((rep) => {
            const rom = Number(RepDataMap.rangeOfMotion(rep.data));
            if (rom !== null && isFinite(rom) && rom > 0) {
                roms.push(rom);
            } else {
                hasFailedROM = true;
            }
        });

        if (hasFailedROM) {
            failed.push(set);
        } else {
            passed0Check.push(set);
        }
    });

    // sanity check for no passing ROMs
    if (passed0Check.length <= 0) {
        return {
            failed: failed,
            passed: [],
        };
    }

    // calculate bounds
    const mean = average(roms);
    const std = standardDeviation(roms, mean);  
    const minValidROM = mean - (6.0*std);
    const maxValidROM = mean + (6.0*std);

    // remove sets with roms below min or above max
    passed0Check.forEach((set) => {
        const hasBadROM = SetUtils.validUnremovedReps(set).some((rep) => {
            const rom = RepDataMap.rangeOfMotion(rep.data);
            return rom < minValidROM || rom > maxValidROM;
        });
        if (hasBadROM) {
            failed.push(set);
        } else {
            passed.push(set);
        }
    });

    // return
    return {
        failed: failed,
        passed: passed,
    };

};

// returns an object with:
//   failed as [] of sets representing bad sets
//   passed as [] of sets representing the set that passed
const velocityCheck = (pool) => {
    let failed = [];
    let passed = [];

    pool.forEach((set) => {
        if (SetUtils.hasUnusableReps(set)) {
            failed.push(set);
        } else {
            passed.push(set);
        }
    });

    return {
        passed: passed,
        failed: failed,
    };
};

// returns { workoutID: { weight: [set] } }
const splitByWorkoutAndWeight = (pool) => {
    // dictionary
    let workouts = {};

    // split it into workouts and weights
    pool.forEach((set) => {
        const lbs = SetUtils.weightInLBs(set);

        // create workout (dictionary of weights) if needed
        if (!workouts.hasOwnProperty(set.workoutID)) {
            workouts[set.workoutID] = {};
        }

        // get workout
        let workout = workouts[set.workoutID];

        // create weight (array of sets) if needed
        if (!workout.hasOwnProperty(lbs)) {
            workout[lbs] = [];
        }

        // push set
        workout[lbs].push(set);
    });

    return workouts;
};

// returns an object with:
//   passed as [] of sets representing fastest
//   failed as [] of sets representing slower ones, meant to be unused
const cherryPick = (workouts) => {
    let passed = [];
    let failed = [];

    // loop weights
    for (var workoutID in workouts) {
        if (workouts.hasOwnProperty(workoutID)) {
            // loop sets
            const workout = workouts[workoutID];
            for (var weight in workout) {
                if (workout.hasOwnProperty(weight)) {
                    // declare
                    let sets = workout[weight];
                    const useRPE = sets.some(set => CollapsedMetrics.canCalcRPE1RM(set));

                    if (useRPE) {
                        // calculate 1rms
                        const e1RMs = sets.map((set) => {
                            return {rpe1RM: CollapsedMetrics.getRPE1RM(set, true), set: set};
                        });
                        
                        // calculate max and add failed
                        let maxSet = e1RMs.reduce((previous, current) => {
                            if (previous === null) {
                                return current;
                            }
                            if (previous.rpe1RM > current.rpe1RM) {
                                failed.push(current.set);
                                return previous;
                            } else if (previous.rpe1RM === current.rpe1RM) {
                                if (SetUtils.startTime(previous) > SetUtils.startTime(current)) {
                                    failed.push(current.set)
                                    return previous;
                                } else {
                                    failed.push(previous.set)
                                    return current;
                                }
                            } else {
                                failed.push(previous.set);
                                return current;
                            }
                        }, null);

                        // push passed
                        passed.push(maxSet.set);
                    } else {
                        // find earliest set aka the first set
                        let earliest = sets.reduce((prev, curr) => {
                            if (SetUtils.startTime(prev) < SetUtils.startTime(curr)) {
                                return prev;
                            } else {
                                return curr;
                            }
                        }, sets[0]);

                        // passed
                        passed.push(earliest);

                        // failed
                        sets.forEach((set) => {
                            if (set.setID !== earliest.setID) {
                                failed.push(set);
                            }
                        });
                    }
                }
            }
        }
    }

    // return
    return {
        passed: passed,
        failed: failed,
    };
};

const containsRPE = (sets) => {
    sets.some(set => set.rpe);
};

// returns an object with:
//   passed as [] of sets representing what we use for 1RM
//   failed as [] of sets representing points that are too close, meant to be unused
const thinSets = (pool) => {
    let buckets = {};
    let passed = [];
    let failed = [];

    // split it into buckets
    pool.forEach((set) => {
        const weight = SetUtils.weightInLBs(set);
        const bucketWeight = getBucketWeight(weight);

        if (!buckets.hasOwnProperty(bucketWeight)) {
            buckets[bucketWeight] = [];
        }

        buckets[bucketWeight].push(set);
    });

    // move latest
    for (var property in buckets) {
        if (buckets.hasOwnProperty(property)) {
            const bucket = buckets[property];
            
            // find the latest set aka most recent set
            let latest = bucket.reduce((prev, curr) => {
                if (SetUtils.startTime(prev) < SetUtils.startTime(curr)) {
                    return curr;
                } else {
                    return prev;
                }
            }, bucket[0]);

            // passed
            passed.push(latest);

            // failed
            bucket.forEach((set) => {
                if (set.setID !== latest.setID) {
                    failed.push(set);
                }
            });
        }
    }

    // return
    return {
        passed: passed,
        failed: failed,
    };
};

const getBucketWeight = (weight) => (parseInt(weight / 1.25) + 1) * 1.25;

const isValidFor1RMCalc = (set, exercise, tagsToInclude, tagsToExclude, daysRange) => {
    const startTime = SetUtils.startTime(set);
    return !SetUtils.isDeleted(set)
        && startTime != null
        && set.exercise
        && set.exercise.trim().toLowerCase() === exercise.trim().toLowerCase()
        && SetUtils.numUsableReps(set) > 0
        && set.weight
        && !isNaN(set.weight)
        && DateUtils.checkDateWithinRange(daysRange, startTime)
        && (checkIncludesTags(set.tags, tagsToInclude)
        && checkExcludesTags(set.tags, tagsToExclude));
};


const checkIncludesTags = (tags, tagsToInclude) => {
    if (!tagsToInclude.length) {
        return true;
    }

    const tagsInsensitive = tags.map(tag => tag.trim().toLowerCase());
    const includeTagsInsensitive = tagsToInclude.map(tag => tag.trim().toLowerCase());

    return includeTagsInsensitive.every((tagToInclude) => tagsInsensitive.includes(tagToInclude));
};

const checkExcludesTags = (tags, tagsToExclude) => {
    if (!tagsToExclude.length) {
        return true;
    }

    const tagsInsensitive = tags.map(tag => tag.trim().toLowerCase());
    const excludeTagsInsensitive = tagsToExclude.map(tag => tag.trim().toLowerCase());

    return excludeTagsInsensitive.every((tagToExclude) => !tagsInsensitive.includes(tagToExclude));
};

// CALCULATION

const calculateRegression = (data, velocity) => {
    if (data.length == 0) {
        // no data
        var r2 = null;
        var e1RM = null;
        var regressionPoints = [];
    } else {
        // regression
        const result = regression.linear(data, { precision: 4 });

        // e1RM
        var e1RM = Number(((velocity - result.equation[1]) / result.equation[0]).toFixed(0));

        // r2
        var r2 = Number((result.r2 * 100).toFixed(0));

        // regression line
        var regressionPoints = result.points.map((pointArray) => {
            return {x: pointArray[0], y: pointArray[1]};
        });
    }

    // return
    return {
        r2: r2,
        e1RM: e1RM,
        regressionPoints: regressionPoints,
    };    
};

// INTERCEPTS
// TODO: make these calculations less resource intensive
// can pass in values that you need rather than recalculating them constantly

const calcSlope = (regressionPoints) => {
    if (!regressionPoints || regressionPoints.length <= 1) {
        return false;
    }

    const first = regressionPoints[0];
    const second = regressionPoints[regressionPoints.length - 1];
    return (second.y - first.y) / (second.x - first.x);
};

const hasNegativeSlope = (regressionPoints) => {
    if (!regressionPoints || regressionPoints.length <= 1) {
        return false;
    }

    const first = regressionPoints[0];
    const second = regressionPoints[regressionPoints.length - 1];
    const slope = (second.y - first.y) / (second.x - first.x);
    return isFinite(slope) && !isNaN(slope) && slope < 0;
};

// aka y intercept
const velocityAt0Weight = (regressionPoints) => {
    if (!regressionPoints || regressionPoints.length <= 1) {
        return null;
    }
    const first = regressionPoints[0];
    const second = regressionPoints[regressionPoints.length - 1];
    const slope = (second.y - first.y) / (second.x - first.x);
    const yint = first.y - (slope * first.x);
    return yint;
};

// aka x intercept
const highestWeightPossible = (regressionPoints) => {
    if (!regressionPoints || regressionPoints.length <= 1) {
        return null;
    }
    const first = regressionPoints[0];
    const second = regressionPoints[regressionPoints.length - 1];
    const slope = (second.y - first.y) / (second.x - first.x);
    const yint = first.y - (slope * first.x);
    return -1 * yint / slope;
};

// Get all tags for an exercises

// TODO: not sure if this is the right place to put this
// it's kinda a selector, but it accesses from multiple reducers
// for now leaving it here

export const getTagsToIncludeSuggestions = (state, exercise, input, ignore) => get1RMTagSuggestions(state, exercise, input, ignore, true);

export const getTagsToExcludeSuggestions = (state, exercise, input, ignore) => get1RMTagSuggestions(state, exercise, input, ignore, false);

const get1RMTagSuggestions = (state, exercise, input, ignore, isInclude=true) => {
    const sets = SetsSelectors.getAllSets(state);
    if (isInclude) {
        var oppositeTags = AnalysisSelectors.getTagsToExclude(state);
    } else {
        var oppositeTags = AnalysisSelectors.getTagsToInclude(state);
    }
    oppositeTags = oppositeTags.map((tag) => tag.toLowerCase());
    const tags = [];

    if (input) {
        input = input.toLowerCase();
    }
    if (exercise) {
        exercise = exercise.toLowerCase();
    }
    ignore = ignore.map((tag) => tag.toLowerCase());

    // generate pool of usable tags
    sets.forEach((set) => {
        if (set.hasOwnProperty('exercise') && set.exercise) {
            let lower = set.exercise.toLowerCase();
            if (lower === exercise && set.tags) {
                set.tags.forEach((tag) => {
                    const lowerTag = tag.toLowerCase();
                    if (!tags.includes(lowerTag)
                        && !oppositeTags.includes(lowerTag)
                        && lowerTag !== 'bug'
                        && !ignore.includes(lowerTag)
                        && lowerTag.includes(input)) {
                        tags.push(lowerTag);
                    }
                });
            }
        }
    });

    return tags;
};





// STD convenience functions
// taken from https://derickbailey.com/2014/09/21/calculating-standard-deviation-with-array-map-and-array-reduce-in-javascript/

function standardDeviation(values, avg=null) {
    if(avg === null) {
        avg = average(values);
    }
    
    var squareDiffs = values.map(function(value){
      var diff = value - avg;
      var sqrDiff = diff * diff;
      return sqrDiff;
    });
    
    var avgSquareDiff = average(squareDiffs);
  
    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}
  
function average(data) {
    var sum = data.reduce(function(sum, value){
      return sum + value;
    }, 0);

    var avg = sum / data.length;
    return avg;
}
