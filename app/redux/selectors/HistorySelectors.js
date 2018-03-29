import * as DateUtils from 'app/utility/DateUtils';
import * as SetUtils from 'app/utility/SetUtils';
import * as WeightConversion from 'app/utility/WeightConversion';

const stateRoot = (state) => state.history;

// video recorder / camera

export const getIsRecording = (state) => stateRoot(state).isRecording;

export const getRecordingVideoType = (state) => stateRoot(state).recordingVideoType;

export const getCameraType = (state) => stateRoot(state).cameraType;

export const getIsCameraVisible = (state) => stateRoot(state).recordingSetID !== null;

export const getRecordingSetID = (state) => stateRoot(state).recordingSetID;

export const getIsSavingVideo = (state) => stateRoot(state).isSavingVideo;

// video player

export const getWatchSetID = (state) => stateRoot(state).watchSetID;

export const getIsVideoPlayerVisible = (state) => stateRoot(state).watchSetID !== null;

export const getWatchFileURL = (state) => stateRoot(state).watchFileURL;

// history viewed 

export const getHistoryViewedCounter = (state) => stateRoot(state).viewedCounter;

// history filters

export const getHistoryFilterExercise = (state) => stateRoot(state).exercise;

export const getHistoryFilterTagsToInclude = (state) => stateRoot(state).tagsToInclude;

export const getHistoryFilterTagsToExclude = (state) => stateRoot(state).tagsToExclude;

export const getHistoryFilterStartingRPE = (state) => stateRoot(state).startingRPE;

export const getHistoryFilterEndingRPE = (state) => stateRoot(state).endingRPE;

export const getHistoryFilterStartingWeight = (state) => stateRoot(state).startingWeight;

export const getHistoryFilterStartingWeightMetric = (state) => stateRoot(state).startingWeightMetric;

export const getHistoryFilterEndingWeightMetric = (state) => stateRoot(state).endingWeightMetric;

export const getHistoryFilterEndingWeight = (state) => stateRoot(state).endingWeight;

export const getHistoryFilterStartingRepRange = (state) => stateRoot(state).startingRepRange;

export const getHistoryFilterEndingRepRange = (state) => stateRoot(state).endingRepRange;

export const getHistoryFilterStartingDate = (state) => stateRoot(state).startingDate;

export const getHistoryFilterEndingDate = (state) => stateRoot(state).endingDate;

export const filterHistory = (allSets, state) => {
    let data = [];

    const exercise = getHistoryFilterExercise(state);
    const tagsToInclude = getHistoryFilterTagsToInclude(state);
    const tagsToExclude = getHistoryFilterTagsToExclude(state);
    const startingRPE = getHistoryFilterStartingRPE(state);
    const endingRPE = getHistoryFilterEndingRPE(state);
    const startingWeight = getHistoryFilterStartingWeight(state);
    const startingWeightMetric = getHistoryFilterStartingWeightMetric(state);
    const endingWeight = getHistoryFilterEndingWeight(state);
    const endingWeightMetric = getHistoryFilterEndingWeightMetric(state);
    const startingRepRange = getHistoryFilterStartingRepRange(state);
    const endingRepRange = getHistoryFilterEndingRepRange(state);
    const startingDate = getHistoryFilterStartingDate(state);
    const endingDate = getHistoryFilterEndingDate(state);

    allSets.forEach((set) => {
        if (set.initialStartTime !== null && isValidForHistoryFilter(set, exercise, tagsToInclude, tagsToExclude, startingRPE, endingRPE, startingWeight, startingWeightMetric, endingWeight, endingWeightMetric, startingRepRange, endingRepRange, startingDate, endingDate)) {
            data.push(set);
        }
    });

    return data;
};

const isValidForHistoryFilter = (set, exercise, tagsToInclude, tagsToExclude, startingRPE, endingRPE, startingWeight, startingWeightMetric, endingWeight, endingWeightMetric, startingRepRange, endingRepRange, startingDate, endingDate) => {
    return !SetUtils.isDeleted(set)
    && checkExercise(set.exercise, exercise)
    && checkIncludesTags(set.tags, tagsToInclude)
    && checkExcludesTags(set.tags, tagsToExclude)
    && checkWeightRange(set.weight, set.metric, startingWeight, startingWeightMetric, endingWeight, endingWeightMetric)
    && checkRPERange(set.rpe, startingRPE, endingRPE)
    && checkDateRange(set.initialStartTime, startingDate, endingDate)
    && checkRepRange(set, startingRepRange, endingRepRange)
}

const checkExercise = (setExercise, exercise) => {
    if (!exercise) {
        return true;
    }

    return setExercise.trim().toLowerCase() === exercise.trim().toLowerCase();
}

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

const checkWeightRange = (setWeight, setMetric, startingWeight, startingWeightMetric, endingWeight, endingWeightMetric) => {
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

const checkRPERange = (setRPE, startingRPE, endingRPE) => {
    // account for commas
    const setRPEWithoutCommas = setRPE ? Number(setRPE.replace(',','.')) : setRPE;
    const startingRPEWithoutCommas = startingRPE ? Number(startingRPE.replace(',','.')) : startingRPE;
    const endingRPEWithoutCommas = endingRPE ? Number(endingRPE.replace(',','.')) : endingRPE;

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

const checkRepRange = (set, startingRepRange, endingRepRange) => {
    const validUnremovedReps = SetUtils.numValidUnremovedReps(set);

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

const checkDateRange = (setInitialStartTime, startingDate, endingDate) => {
    if (!startingDate && !endingDate) {
        return true;
    } else if (startingDate && !endingDate) {
        return new Date(setInitialStartTime) >= new Date(startingDate);
    } else if (!startingDate && endingDate) {
        return new Date(setInitialStartTime) <= new Date(endingDate);
    } else {
        return new Date(setInitialStartTime) >= new Date(startingDate) && new Date(setInitialStartTime) <= new Date(endingDate);
    }
};
