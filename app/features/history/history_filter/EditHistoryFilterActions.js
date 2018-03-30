import {
    PRESENT_HISTORY_FILTER,
    CLOSE_HISTORY_FILTER,
} from 'app/configs+constants/ActionTypes';

export const presentHistoryFilter = () => ({
    type: PRESENT_HISTORY_FILTER,
});

export const dismissHistoryFilter = () => ({
    type: CLOSE_HISTORY_FILTER,
});
