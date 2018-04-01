import {
    PRESENT_HISTORY_FILTER_EXERCISE,
    CLOSE_HISTORY_FILTER,
} from 'app/configs+constants/ActionTypes';

export const presentSelectExercise = () => ({ 
    type: PRESENT_HISTORY_FILTER_EXERCISE,
});

export const dismissHistoryFilter = () => ({
    type: CLOSE_HISTORY_FILTER,
});
