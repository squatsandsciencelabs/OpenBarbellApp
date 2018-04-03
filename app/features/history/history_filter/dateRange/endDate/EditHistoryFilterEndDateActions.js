import {
    SAVE_HISTORY_FILTER_END_DATE,
    DISMISS_HISTORY_FILTER_END_DATE,
} from 'app/configs+constants/ActionTypes';

export const changeDate = (date) => ({ 
    type: SAVE_HISTORY_FILTER_END_DATE,
    date: date.toISOString().split('T')[0],
});

// Assuming these will be needed for future analytics

export const dismissPicker = () => ({
    type: DISMISS_HISTORY_FILTER_END_DATE,
});
