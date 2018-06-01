import { Alert } from 'react-native';
import moment from 'moment';
import * as HistorySelectors from 'app/redux/selectors/HistorySelectors';
import {
    SAVE_HISTORY_FILTER_END_DATE,
    DISMISS_HISTORY_FILTER_END_DATE,
} from 'app/configs+constants/ActionTypes';

export const changeDate = (date) => (dispatch, getState) => {
    const state = getState();
    const startDate = HistorySelectors.getEditingHistoryFilterStartingDate(state);
    const endDate = date.toString();

    if (moment(startDate) < moment(endDate) || !startDate) {
        dispatch({ 
            type: SAVE_HISTORY_FILTER_END_DATE,
            date: endDate,
        });
    } else {
        Alert.alert("End date must be after start date")
    }
};

export const dismissPicker = () => ({
    type: DISMISS_HISTORY_FILTER_END_DATE,
});
