export const isEmpty = (set) => {
    return hasEmptyData(set) && hasEmptyReps(set);
};

export const hasEmptyData = (set) => {
    return !set.exercise && !set.weight && !set.rpe && (set.tags !== null && set.tags !== undefined && set.tags.length === 0) && !set.videoFileURL;
};

export const hasEmptyReps = (set) => {
    if (set.reps !== null && set.reps !== undefined && set.reps.length === 0) {
        return true;
    }

    let activeRep = set.reps.find((rep) => { return !rep.removed; });
    return activeRep === undefined;
};
