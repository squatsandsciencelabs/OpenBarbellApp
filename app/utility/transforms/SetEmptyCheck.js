// no data and no active reps
export const isEmpty = (set) => {
    return hasEmptyData(set) && hasEmptyReps(set);
};

// no data and no reps at all
export const isUntouched = (set) => {
    return hasEmptyData(set) && hasNoReps(set);
};

export const hasEmptyData = (set) => {
    return !set.exercise && (!set.weight || set.weight === '') && (!set.rpe || set.rpe === '') && (!set.tags || set.tags === undefined || set.tags.length === 0) && !set.videoFileURL;
};

export const hasNoReps = (set) => {
    return set.reps !== null && set.reps !== undefined && set.reps.length === 0;
};

export const hasEmptyReps = (set) => {
    if (hasNoReps(set)) {
        return true;
    }

    let activeRep = set.reps.find((rep) => { return !rep.removed; });
    return activeRep === undefined;
};
