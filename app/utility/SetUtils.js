import * as RepDataMap from 'app/utility/RepDataMap';

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
    return set.reps.filter(rep => !rep.removed && isRepUsable(rep));
};

export const hasUnremovedRep = (set) => {
    return set.reps.some(rep => !rep.removed);
};

// NOTE: this does not consider infinity / 0 invalid
export const validUnremovedReps = (set) => {
    return set.reps.filter(rep => rep.isValid && !rep.removed);
};

export const weightInLBs = (set) => {
    if (!set.hasOwnProperty('weight') || set.weight === null || !Number(set.weight)) {
        return null;
    } else if (set.metric === 'lbs') {
        return Number(set.weight);
    } else if (set.metric === 'kgs') {
        return Math.round(Number(set.weight) * 2.20462262);
    } else {
        // should never reach here
        return null;
    }
};

export const weightInKGs = (set) => {
    if (!set.hasOwnProperty('weight') || set.weight === null || !Number(set.weight)) {
        return null;
    } else if (set.metric === 'kgs') {
        return Number(set.weight);
    } else if (set.metric === 'lbs') {
        return Math.round(Number(set.weight) * 0.45359237);
    } else {
        // should never reach here
        return null;
    }
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
    return !(!velocity || isNaN(velocity) || velocity.toLowerCase().includes('nf') || Number(velocity) < 0 || Number(velocity) >= 10);
};

// NOTE: this considers infinity / 0 invalid
export const hasUnusableReps = (set) => {
    return set.reps.some(rep => !isRepUsable(rep));
};

// NOTE: this considers infinity / 0 invalid
export const getFastestUsableAvgVelocity = (set) => {
    const reps = usableReps(set);
    if (!reps || reps.length === 0) {
        return null;
    }

    return Math.max.apply(Math, reps.map(rep => Number(RepDataMap.averageVelocity(rep.data))));
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
