import { Alert } from 'react-native';
import moment from 'moment';
import * as HistorySelectors from 'app/redux/selectors/HistorySelectors';
import {
    SAVE_HISTORY_FILTER_START_DATE,
    DISMISS_HISTORY_FILTER_START_DATE,
} from 'app/configs+constants/ActionTypes';

export const changeDate = (date) => (dispatch, getState) => {
    const state = getState();
    const endDate = HistorySelectors.getEditingHistoryFilterEndingDate(state);
    const startDate = date.toString();

    if (moment(endDate) > moment(startDate) || !endDate) {
        dispatch({ 
            type: SAVE_HISTORY_FILTER_START_DATE,
            date: startDate,
        });
    } else {
        Alert.alert("Invalid Date Filter", "Please select a date that is before your 'to' date.");
    }
};

export const dismissPicker = () => ({
    type: DISMISS_HISTORY_FILTER_START_DATE
});
