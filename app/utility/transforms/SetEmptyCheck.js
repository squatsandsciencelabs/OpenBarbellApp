import * as RepDataMap from 'app/utility/transforms/RepDataMap';

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

export const numValidUnremovedReps = (set) => {
    return set.reps.reduce((sum, rep) => {
        if (rep.isValid === false || rep.removed === true) {
            return sum;
        } else {
            return sum+1;
        }
    }, 0);
};

export const hasValidVelocity = (set) => {
    set.reps.map((rep) => {
        if (rep.isValid && !rep.removed && rep.data) {
            const velocity = RepDataMap.averageVelocity(rep.data); // this should always return a string
            if (velocity && !isNaN(velocity) && !velocity.toLowerCase().includes('nf') && velocity > 0) {
                return true;
            }
        }
    });
    return false;
};
