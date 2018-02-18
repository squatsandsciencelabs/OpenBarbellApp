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
export const calculate1RM = (exercise, tagsToInclude, tagsToExclude, daysRange, velocity, allSets) => {
    let errors = [];
    let unused = [];
    let active = [];

    // Step 1: Extract a chronological pool of relevant (check all sets against rep/weight/tag/date/exercise check)
    let pool = getSetsFor1RM(exercise, tagsToInclude, tagsToExclude, daysRange, velocity, allSets);

    // Step 2A: Remove based on ROM Check

    // Step 2B: Remove based on Weight Check

    // Step 2C: Remove based on Velocity Check
    const velocityResults = velocityCheck(pool);
    errors.push(...velocityResults.failed);
    pool = velocityResults.passed;

    // Step 3A: Split by workout
    const workouts = splitByWorkoutAndWeight(pool);

    // Step 3B: Unused via Fastest Check
    const fastestResults = fastestCheck(workouts);
    unused.push(...fastestResults.failed);
    pool = fastestResults.passed;

    // Step 3C: Active via Buckets
    const thinResults = thinSets(pool);
    unused.push(...thinResults.failed);
    active.push(...thinResults.passed);

    // Step 4: Convert into chart points
    const activeChartData = active.map((set) => {
        return { x: parseFloat(set.weight), y: Number(RepDataMap.averageVelocity(SetUtils.getFirstValidUnremovedRep(set).data)), setID: set.setID };
    });
    const errorChartData = errors.map((set) => {
        return { x: parseFloat(set.weight), y: Number(RepDataMap.averageVelocity(SetUtils.getFirstValidUnremovedRep(set).data)), setID: set.setID };
    });
    const unusedChartData = unused.map((set) => {
        return { x: parseFloat(set.weight), y: Number(RepDataMap.averageVelocity(SetUtils.getFirstValidUnremovedRep(set).data)), setID: set.setID };
    });

    // Step 5: Calculate Regression
    const exerciseData = activeChartData.map((point) => {
        return [point.x, point.y];
    });
    const regressionResults = calculateRegression(exerciseData, velocity);

    // return
    return {
        e1RM: regressionResults.e1RM,
        r2: regressionResults.r2,
        active: activeChartData,
        errors: errorChartData,
        unused: unusedChartData,
        regressionPoints: regressionResults.regressionPoints,
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
const velocityCheck = (pool) => {
    let failed = [];
    let passed = [];

    pool.map((set) => {
        if (SetUtils.hasInvalidVelocity(set)) {
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
    pool.map((set) => {
        // create workout (dictionary of weights) if needed
        if (!workouts.hasOwnProperty(set.workoutID)) {
            workouts[set.workoutID] = {};
        }

        // get workout
        let workout = workouts[set.workoutID];

        // create weight (array of sets) if needed
        if (!workout.hasOwnProperty(set.weight)) {
            workout[set.weight] = [];
        }

        // push set
        workout[set.weight].push(set);
    });

    return workouts;
};

// returns an object with:
//   passed as [] of sets representing fastest
//   failed as [] of sets representing slower ones, meant to be unused
const fastestCheck = (workouts) => {
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
                            return {rpe1RM: CollapsedMetrics.getRPE1RM(set), set: set};
                        });
                        
                        // calculate max and add failed
                        let maxSet = e1RMs.reduce((previous, current) => {
                            if (previous === null) {
                                return current;
                            }
                            if (previous.rpe1RM > current.rpe1RM) {
                                failed.push(current.set);
                                return previous;
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
        const bucketWeight = getBucketWeight(set.weight);

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
    return startTime != null
        && set.exercise
        && set.exercise.trim().toLowerCase() === exercise.trim().toLowerCase()
        && SetUtils.numValidUnremovedReps(set) > 0
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

    return tagsToInclude.every((tagToInclude) => {
        return tags.includes(tagToInclude);
    });
};

const checkExcludesTags = (tags, tagsToExclude) => {
    if (!tagsToExclude.length) {
        return true;
    }

    return tagsToExclude.every((tagToExclude) => {
        return !tags.includes(tagToExclude);
    });
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
        // var regressionPoints = data.map((set) => {
        //     return { x: parseFloat(set.weight), y: result.predict(set.weight), setID: set.setID };
        // });
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

// RANGES

export const lowestWeightPoint = (data) => {
    if (!data) {
        return null;
    }
    return data.reduce((prev, point) => point.x < prev.x ? point : prev, data[0]);
};

export const lowestWeight = (data) => {
    if (!data) {
        return null;
    }
    return Math.min.apply(Math, data.map((point) => { return point.x; }));
};

export const highestWeight = (data) => {
    if (!data) {
        return null;
    }
    return Math.max.apply(Math, data.map((point) => { return point.x; }));
};

export const highestWeightPossible = (regressionPoints) => {
    if (!regressionPoints || regressionPoints.length <= 1) {
        return null;
    }
    const first = regressionPoints[0];
    const second = regressionPoints[regressionPoints.length - 1];
    const slope = (second.y - first.y) / (second.x - first.x);
    const yint = first.y - (slope * first.x);
    return -1 * yint / slope;
};

export const highestVelocity = (data) => {
    if (!data) {
        return null;
    }
    return Math.max.apply(Math, data.map((point) => { return point.y; }));
};

// Get all tags for an exercises

// TODO: not sure if this is the right place to put this
// it's kinda a selector, but it accesses from multiple reducers
// for now leaving it here
export const getTagsToIncludeSuggestions = (state, exercise) => {
    const sets = SetsSelectors.getAllSets(state);
    const tagsToInclude = AnalysisSelectors.getTagsToInclude(state);
    const tagsToExclude = AnalysisSelectors.getTagsToExclude(state);
    const tags = [];

    sets.forEach((set) => {
        if (set.exercise === exercise && set.tags) {
            set.tags.forEach((tag) => {
                if (!tags.includes(tag) && !tagsToExclude.includes(tag) && !tagsToInclude.includes(tag) && tag !== 'Bug') {
                    tags.push(tag);
                }
            });
        }
    });

    return tags;
};

// TODO: not sure if this is the right place to put this
// it's kinda a selector, but it accesses from multiple reducers
// for now leaving it here
export const getTagsToExcludeSuggestions = (state, exercise) => {
    const sets = SetsSelectors.getAllSets(state);
    const tagsToInclude = AnalysisSelectors.getTagsToInclude(state);
    const tagsToExclude = AnalysisSelectors.getTagsToExclude(state);
    const tags = [];

    sets.forEach((set) => {
        if (set.exercise === exercise && set.tags) {
            set.tags.forEach((tag) => {
                if (!tags.includes(tag) && !tagsToInclude.includes(tag) && !tagsToExclude.includes(tag) && tag !== 'Bug') {
                    tags.push(tag);
                }
            });
        }
    });

    return tags;
};
