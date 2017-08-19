// this is here because of legacy issues
// originally, sets saved their start and end times
// however, once rep deletion was added, the rest calculation is off

export const startTime = (set) => {
    if (set.startTime === undefined) {
        // time of first rep
        let validReps = set.reps.filter((rep) => !rep.removed && rep.isValid);        
        if (validReps.length > 0) {
            return validReps[0].time;
        } else {
            console.tron.log("start time calculation failed for " + set);
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
        let validReps = set.reps.filter((rep) => !rep.removed && rep.isValid);        
        if (validReps.length > 0) {
            return validReps[validReps.length-1].time;
        } else {
            console.tron.log("end time calculation failed for " + set);
            return null;
        }
    } else {
        // legacy time of set itself
        return set.endTime;
    }
};
