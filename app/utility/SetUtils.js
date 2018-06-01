import * as RepDataMap from 'app/utility/RepDataMap';
import * as WeightConversion from 'app/utility/WeightConversion';
import * as DateUtils from 'app/utility/DateUtils';

export const isDeleted = (set) => {
    if (set.hasOwnProperty('deleted')) {
        // new sets used the deleted flag
        return set.deleted;
    } else {
        // old sets use isEmpty checks
        return isEmpty(set);
    }
};

// no data and no active reps
export const isEmpty = (set) => {
    return hasEmptyData(set) && hasEmptyReps(set);
};

// no data and no reps at all
export const isUntouched = (set) => {
    return hasEmptyData(set) && hasNoReps(set);
};

export const hasAllFields = (set) => {
    if (set.exercise && set.weight && set.rpe && set.tags && set.tags.length > 0) {
        return true;
    }
    return false;
};

export const hasEmptyFields = (set) => {
    return !set.exercise && (!set.weight || set.weight === '') && (!set.rpe || set.rpe === '') && (!set.tags || set.tags === undefined || set.tags.length === 0);
};

export const hasEmptyData = (set) => {
    return hasEmptyFields(set) && !set.videoFileURL;
};

export const hasNoReps = (set) => {
    if (set.reps === null || set.reps === undefined) {
        return true;
    }
    return set.reps.length === 0;
};

export const hasEmptyReps = (set) => {
    if (hasNoReps(set)) {
        return true;
    }

    let activeRep = set.reps.find((rep) => { return rep.removed === false; });
    return activeRep === undefined;
};

// NOTE: this considers infinity / 0 invalid
export const usableReps = (set) => {
    if (!set || !set.hasOwnProperty('reps')) {
        return [];
    }
    return set.reps.filter(rep => !rep.removed && isRepUsable(rep));
};

export const hasUnremovedRep = (set) => {
    if (!set || !set.hasOwnProperty('reps')) {
        return false;
    }
    return set.reps.some(rep => !rep.removed);
};

// NOTE: this does not consider infinity / 0 invalid
export const validUnremovedReps = (set) => {
    if (!set || !set.hasOwnProperty('reps')) {
        return [];
    }
    return set.reps.filter(rep => rep.isValid && !rep.removed);
};

export const weightInLBs = (set) => {
    if (!set.hasOwnProperty('weight') || set.weight === null || isNaN(set.weight) || !set.metric) {
        return null;
    } 

    return WeightConversion.weightInLBs(set.metric, set.weight);

};

export const weightInKGs = (set) => {
    if (!set.hasOwnProperty('weight') || set.weight === null || isNaN(set.weight) || !set.metric) {
        return null;
    } 

    return WeightConversion.weightInKGs(set.metric, set.weight);
};

export const numFieldsEntered = (set) => {
    let fields = [set.exercise, set.weight, set.rpe, set.tags.length];
    let num_fields_entered = 0;

    fields.forEach((field) => {
        if (Boolean(field)) {
            num_fields_entered++;
        }
    });
    
    return num_fields_entered;
};

// NOTE: this does not consider infinity / 0 invalid
export const numValidUnremovedReps = (set) => validUnremovedReps(set).length;

// NOTE: this considers infinity / 0 invalid
export const numUsableReps = (set) => usableReps(set).length;

// NOTE: this considers infinity / 0 invalid
export const isRepUsable = (rep) => {
    if (!rep.isValid || !rep.data) {
        return false;
    }
    const velocity = RepDataMap.averageVelocity(rep.data); // this should always return a string
    const peakVelocity = RepDataMap.peakVelocity(rep.data);
    return isVelocityUsable(velocity) && isVelocityUsable(peakVelocity);
};

const isVelocityUsable = (velocity) => {
    return !(!velocity || isNaN(velocity) || !isFinite(velocity) || Number(velocity) < 0 || Number(velocity) >= 10);
};

// NOTE: this considers infinity / 0 invalid, but only considers not removed reps
export const hasUnusableReps = (set) => {
    if (!set || !set.hasOwnProperty('reps')) {
        return false;
    }
    return set.reps.some(rep => !rep.removed && !isRepUsable(rep));
};

// NOTE: this considers infinity / 0 invalid
export const getFastestUsableAvgVelocity = (set) => {
    const reps = usableReps(set);
    if (!reps || reps.length === 0) {
        return null;
    }

    return Math.max.apply(Math, reps.map(rep => Number(RepDataMap.averageVelocity(rep.data))));
};

export const markerDisplayValue = (set, metric) => {
    if (metric === 'lbs') {
        var weight = weightInLBs(set);
    } else {
        var weight = weightInKGs(set);
    }
    return Number(weight).toFixed(2) + metric + ", " + getFastestUsableAvgVelocity(set) + "m/s";
};

// this is here because of legacy issues
// originally, sets saved their start and end times
// however, once rep deletion was added, the rest calculation is off

export const startTime = (set) => {
    if (!set) {
        return null;
    } else if (set.startTime === undefined) {
        // time of first rep
        let validReps = validUnremovedReps(set);
        if (validReps.length > 0 && validReps[0].time !== undefined) {
            return validReps[0].time;
        } else if (set.initialStartTime !== undefined) {
            return set.initialStartTime;
        } else {
            return null;
        }
    } else {
        // legacy time of set itself
        return set.startTime;
    }
};

export const endTime = (set) => {
    if (set.endTime === undefined) {
        // time of last rep
        let validReps = validUnremovedReps(set);
        if (validReps.length > 0) {
            return validReps[validReps.length-1].time;
        } else {
            return null;
        }
    } else {
        // legacy time of set itself
        return set.endTime;
    }
};

export const checkExercise = (setExercise, exercise) => {
    if (!exercise) {
        return true;
    } else if (exercise && !setExercise) {
        false;
    } else {
        return setExercise.trim().toLowerCase() === exercise.trim().toLowerCase();
    }
};

export const checkIncludesTags = (tags, tagsToInclude) => {
    if (!tagsToInclude.length) {
        return true;
    }

    const tagsInsensitive = tags.map(tag => tag.trim().toLowerCase());
    const includeTagsInsensitive = tagsToInclude.map(tag => tag.trim().toLowerCase());

    return includeTagsInsensitive.every((tagToInclude) => tagsInsensitive.includes(tagToInclude));
};

export const checkExcludesTags = (tags, tagsToExclude) => {
    if (!tagsToExclude.length) {
        return true;
    }

    const tagsInsensitive = tags.map(tag => tag.trim().toLowerCase());
    const excludeTagsInsensitive = tagsToExclude.map(tag => tag.trim().toLowerCase());

    return excludeTagsInsensitive.every((tagToExclude) => !tagsInsensitive.includes(tagToExclude));
};

// starting is the minimum, while ending is the maximum

export const checkWeightRange = (setWeight, setMetric, startingWeight, startingWeightMetric, endingWeight, endingWeightMetric) => {
    // turn into pounds
    const setWeightLBs = WeightConversion.weightInLBs(setMetric, setWeight);
    const startingWeightLBs = WeightConversion.weightInLBs(startingWeightMetric, startingWeight);
    const endingWeightLBs = WeightConversion.weightInLBs(endingWeightMetric, endingWeight);
    
    if (!startingWeightLBs && !endingWeightLBs) {
        return true;
    } else if ((startingWeightLBs || endingWeightLBs) && !setWeightLBs) {
        return false;
    } else if (!startingWeightLBs && endingWeightLBs) {
        return setWeightLBs <= endingWeightLBs;
    } else if (startingWeightLBs && !endingWeightLBs) {
        return setWeightLBs >= startingWeightLBs;
    } else {
        return setWeightLBs >= startingWeightLBs && setWeightLBs <= endingWeightLBs;
    }
};

export const checkRPERange = (setRPE, startingRPE, endingRPE) => {
    // account for commas
    const setRPEWithoutCommas = setRPE ? Number(setRPE.toString().replace(',','.')) : setRPE;
    const startingRPEWithoutCommas = startingRPE ? Number(startingRPE.toString().replace(',','.')) : startingRPE;
    const endingRPEWithoutCommas = endingRPE ? Number(endingRPE.toString().replace(',','.')) : endingRPE;

    if (!startingRPEWithoutCommas && !endingRPEWithoutCommas) {
        return true;
    } else if ((startingRPEWithoutCommas || endingRPEWithoutCommas) && !setRPE) {
        return false;
    } else if (!startingRPEWithoutCommas  && endingRPEWithoutCommas) {
        return setRPEWithoutCommas <= endingRPEWithoutCommas;
    } else if (startingRPEWithoutCommas && !endingRPEWithoutCommas) {
        return setRPEWithoutCommas >= startingRPEWithoutCommas ;
    } else {
        return setRPEWithoutCommas >= startingRPEWithoutCommas && setRPEWithoutCommas <= endingRPEWithoutCommas;
    }
};

export const checkRepRange = (set, startingRepRange, endingRepRange) => {
    const validUnremovedReps = numValidUnremovedReps(set);

    if (!startingRepRange && !endingRepRange) {
        return true;
    } else if (!startingRepRange && endingRepRange) {
        return validUnremovedReps <= endingRepRange;
    } else if (startingRepRange && !endingRepRange) {
        return validUnremovedReps >= startingRepRange;
    } else {
        return validUnremovedReps >= startingRepRange && validUnremovedReps <= endingRepRange;
    }
};

// startingDate is the minimum date, ending date is the maximum
export const checkDateRange = (setInitialStartTime, startingDate, endingDate) => {
    if (!startingDate && !endingDate) {
        return true;
    } else if (startingDate && !endingDate) {
        return DateUtils.getDate(setInitialStartTime) >= DateUtils.getDate(startingDate);
    } else if (!startingDate && endingDate) {
        return DateUtils.getDate(setInitialStartTime) <= DateUtils.getDate(endingDate);
    } else {
        return DateUtils.getDate(setInitialStartTime) >= DateUtils.getDate(startingDate) && DateUtils.getDate(setInitialStartTime) <= DateUtils.getDate(endingDate);
    }
};
