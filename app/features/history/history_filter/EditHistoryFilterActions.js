import {
    PRESENT_HISTORY_FILTER_EXERCISE,
    PRESENT_HISTORY_FILTER_START_DATE,
    PRESENT_HISTORY_FILTER_END_DATE,
    PRESENT_HISTORY_FILTER_INCLUDES_TAGS,
    PRESENT_HISTORY_FILTER_EXCLUDES_TAGS,
    CLOSE_HISTORY_FILTER,
    SAVE_HISTORY_FILTER_START_RPE,
    SAVE_HISTORY_FILTER_END_RPE,
    SAVE_HISTORY_FILTER_STARTING_REP_RANGE,
    SAVE_HISTORY_FILTER_ENDING_REP_RANGE,
    SAVE_HISTORY_FILTER_START_WEIGHT,
    SAVE_HISTORY_FILTER_END_WEIGHT,
} from 'app/configs+constants/ActionTypes';

export const presentSelectExercise = () => ({ 
    type: PRESENT_HISTORY_FILTER_EXERCISE,
});

export const dismissHistoryFilter = () => ({
    type: CLOSE_HISTORY_FILTER,
});

export const presentTagsToInclude = () => ({ 
    type: PRESENT_HISTORY_FILTER_INCLUDES_TAGS, 
});

export const presentTagsToExclude = () => ({ 
    type: PRESENT_HISTORY_FILTER_EXCLUDES_TAGS,
});

export const presentStartDate = () => ({
    type: PRESENT_HISTORY_FILTER_START_DATE,
});

export const presentEndDate = () => ({
    type: PRESENT_HISTORY_FILTER_END_DATE,
});

export const updateStartWeight = (weight) => ({
    type: SAVE_HISTORY_FILTER_START_WEIGHT,
    startWeight: weight,
});

export const updateEndWeight = (weight) => ({
    type: SAVE_HISTORY_FILTER_END_WEIGHT,
    endWeight: weight,
});

export const updateStartRPE = (rpe) => ({
    type: SAVE_HISTORY_FILTER_START_RPE,
    rpe: rpe,
});

export const updateEndRPE = (rpe) => ({
    type: SAVE_HISTORY_FILTER_END_RPE,
    rpe: rpe,
});

export const updateStartingRepRange = (reps) => ({
    type: SAVE_HISTORY_FILTER_STARTING_REP_RANGE,
    startingRepRange: reps,
});

export const updateEndingRepRange = (reps) => ({
    type: SAVE_HISTORY_FILTER_ENDING_REP_RANGE,
    endingRepRange: reps,
});
