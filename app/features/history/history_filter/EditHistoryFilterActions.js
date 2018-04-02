import {
    PRESENT_HISTORY_FILTER_EXERCISE,
    PRESENT_HISTORY_FILTER_START_DATE,
    PRESENT_HISTORY_FILTER_END_DATE,
    PRESENT_HISTORY_FILTER_INCLUDES_TAGS,
    PRESENT_HISTORY_FILTER_EXCLUDES_TAGS,
    CLOSE_HISTORY_FILTER,
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
