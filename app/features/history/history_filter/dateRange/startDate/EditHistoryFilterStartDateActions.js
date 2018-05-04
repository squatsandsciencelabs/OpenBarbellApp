import {
    SAVE_HISTORY_FILTER_START_DATE,
    DISMISS_HISTORY_FILTER_START_DATE,
} from 'app/configs+constants/ActionTypes';

export const changeDate = (date) => ({
    type: SAVE_HISTORY_FILTER_START_DATE,
    date: date.toLocaleString(),
});

export const dismissPicker = () => ({
    type: DISMISS_HISTORY_FILTER_START_DATE
});
