import regression from 'regression';

import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';

// NOTE: state only be used to get all sets for internal calculation purposes
// everything else should be passed in
// returns an object with multiple properties
export const calculate1RM = (state, exercise, tagstoInclude, tagsToExclude, ) => {

};

// DATA POINTS

const get1RMExerciseData = (state, exercise) => {   
    const sets = SetsSelectors.getAllSets(state);
    let data = [];
    // check if date fits within range
    const range = AnalysisSelectors.getAnalysisRange(state);

    sets.forEach((set) => {
        if (isValidFor1RMCalc(state, set, exercise, range)) {
            data.push([parseFloat(set.weight), Number(RepDataMap.averageVelocity(getFirstValidUnremovedRep(set.reps).data))]);
        }
    });

    return data;
};

const get1RMChartData = (state, exercise) => {
    const sets = SetsSelectors.getAllSets(state);
    let data = [];
    // check if date fits within range
    const range = AnalysisSelectors.getAnalysisRange(state);

    sets.forEach((set) => {
        if (isValidFor1RMCalc(state, set, exercise, range)) {
            data.push({ x: parseFloat(set.weight), y: Number(RepDataMap.averageVelocity(getFirstValidUnremovedRep(set.reps).data)), setID: set.setID });
        }
    });

    return data;
};

const get1RMRegLinePoints = (state, exercise, exerciseData) => {
    const sets = SetsSelectors.getAllSets(state);
    let data = [];
    // check if date fits within range
    const range = AnalysisSelectors.getAnalysisRange(state);

    // TODO: don't calculate every point along the line, just need two points! speed it up
    sets.forEach((set) => {
        if (isValidFor1RMCalc(state, set, exercise, range)) {
            data.push({ x: parseFloat(set.weight), y: OneRMCalculator.calcVel(exerciseData, set.weight)[1], setID: set.setID });
        }
    });

    return data;
};

const checkIncludesTags = (state, tags) => {
    const tagsToInclude = AnalysisSelectors.getTagsToInclude(state);

    if (!tagsToInclude.length) {
        return true;
    }

    return tagsToInclude.every((tagToInclude) => {
        return tags.includes(tagToInclude);
    });
};

const checkExcludesTags = (state, tags) => {
    const tagsToExclude = AnalysisSelectors.getTagsToExclude(state);

    if (!tagsToExclude.length) {
        return true;
    }

    return tagsToExclude.every((tagToExclude) => {
        return !tags.includes(tagToExclude);
    });
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

// CALCULATION

// Data must be an array of arrays, sub arrays representing X, and Y values
const calc1rm = (data, velocity) => {
    if (!data) {
        return null;
    }
    // gather points
    // precision is 4 for accuracy of regression points in the library
    const result = regression.linear(data, { precision: 4 });

    // prediction
    // solving for x instead of y (x being weight, y being vel)
    return Number(((velocity - result.equation[1]) / result.equation[0]).toFixed(0));
};

const getR2interval = (data) => {
    if (!data) {
        return null;
    }
    // gather points
    // precision is 4 for accuracy of regression points in the library
    const result = regression.linear(data, { precision: 4 });

    // r2 prediction
    return Number((result.r2 * 100).toFixed(0));
};

const calcVel = (data, weight) => {
    if (!data) {
        return null;
    }

    const result = regression.linear(data, { precision: 4 });

    return result.predict(weight);
};

const getRegressionPoints = (data) => {
    if (!data) {
        return null;
    }
    // gather points
    // precision is 4 for accuracy of regression points in the library
    const result = regression.linear(data, { precision: 4 });
    
    return result.points;
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

// CONVENIENCE

const isValidFor1RMCalc = (state, set, exercise, range) => {
    const startTime = SetUtils.startTime(set);
    return startTime
        && set.exercise
        && set.exercise.trim().toLowerCase() === exercise.trim().toLowerCase()
        && SetUtils.numValidUnremovedReps(set) > 0
        && set.weight
        && !isNaN(set.weight)
        && DateUtils.checkDateWithinRange(range, startTime)
        && (checkIncludesTags(state, set.tags)
        && checkExcludesTags(state, set.tags));
};

const getFirstValidUnremovedRep = (reps) => {
    return reps.find((rep) => {
        return rep.isValid && !rep.removed;
    });
};
