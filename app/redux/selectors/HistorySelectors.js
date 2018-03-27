import * as DateUtils from 'app/utility/DateUtils';
import * as SetUtils from 'app/utility/SetUtils';

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
    const endingWeight = getHistoryFilterEndingWeight(state);
    const startingRepRange = getHistoryFilterStartingRepRange(state);
    const endingRepRange = getHistoryFilterEndingRepRange(state);
    const startingDate = getHistoryFilterStartingDate(state);
    const endingDate = getHistoryFilterEndingDate(state);

    allSets.forEach((set) => {
        if (isValidForHistoryFilter(set, exercise, tagsToInclude, tagsToExclude, startingRPE, endingRPE, startingWeight, endingWeight, startingRepRange, endingRepRange, startingDate, endingDate)) {
            data.push(set);
        }
    });

    return data;
};

const isValidForHistoryFilter = (set, exercise, tagsToInclude, tagsToExclude, startingRPE, endingRPE, startingWeight, endingWeight, startingRepRange, endingRepRange, startingDate, endingDate) => {
    const startTime = SetUtils.startTime(set);
    return !SetUtils.isDeleted(set) 
    && startTime != null
    && checkExercise(set.exercise, exercise)
    && checkIncludesTags(set.tags, tagsToInclude)
    && checkExcludesTags(set.tags, tagsToExclude)
    && checkWeightRange(set.weight, startingWeight, endingWeight)
    && checkRPERange(set.rpe, startingRPE, endingRPE)
    && checkDateRange(set.initialStartTime, startingDate, endignDate)
}

// TODO: Refactor this out to utilities since one rm calc uses it too

const checkExercise = (exercise, setExercise) => {
    if (!exercise) {
        return true;
    }

    return exercise.trim().toLowerCase === exercise.trim().toLowerCase();
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

const checkWeightRange = (setWeight, startingWeight, endingWeight) => {
    if (!startingWeight && !endingWeight) {
        return true;
    } else if (!startingWeight && endingWeight) {
        return setWeight <= endingWeight;
    } else if (startingWeight && !endingWeight) {
        return setWeight >= startingWeight;
    } else {
        return setWeight >= startingWeight && setWeight <= endingWeight;
    }
};

const checkRPERange = (setRPE, startingRPE, endingRPE) => {
    if (!startingRPE && !endingRPE) {
        return true;
    } else if (!startingRPE && endingRPE) {
        return Number(setRPE) <= endingRPE;
    } else if (startingRPE && !endingRPE) {
        return Number(setRPE) >= startingRPE;
    } else {
        return Number(setRPE) >= startingRPE && Number(setRPE) <= endingRPE;
    }
};

const checkDateRange = (setInitialStartTime, startDate, endDate) => {
    if (!startDate && !endDate) {
        return true;
    } else if (startDate && !endDate) {
        return new Date(setInitialStartTime) >= new Date(startDate);
    } else if (!startDate && endDate) {
        return new Date(setInitialStartTime) <= new Date(endDate);
    } else {
        return new Date(setInitialStartTime) >= new Date(startDate) && new Date(setInitialStartTime) <= new Date(endDate);
    }
};
