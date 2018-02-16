import {
    PRESENT_END_SET_TIMER,
    PRESENT_DEFAULT_METRIC,
    UPDATE_HISTORY_FILTER,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const presentEndSetTimer = () => {
    Analytics.setCurrentScreen('edit_end_set_timer');

    return {
        type: PRESENT_END_SET_TIMER
    }
};

export const presentSetMetric = () => {
    Analytics.setCurrentScreen('edit_default_metric');
    
    return {
	    type: PRESENT_DEFAULT_METRIC
    }
};

export const showRemovedData = () => (dispatch, getState) => {
    const state = getState();
    logShowDeletedAnalytics(state);

    dispatch({
        type: UPDATE_HISTORY_FILTER,
        showRemoved: true,
    });
};

export const hideRemovedData = () => (dispatch, getState) => {
    const state = getState();
    logHideDeletedAnalytics(state);

    dispatch({
        type: UPDATE_HISTORY_FILTER,
        showRemoved: false
    });
};

// ANALYTICS

const logShowDeletedAnalytics = (state) => {
    Analytics.logEventWithAppState('show_deleted', {
    }, state);
};

const logHideDeletedAnalytics = (state) => {
    Analytics.logEventWithAppState('hide_deleted', {
    }, state);
};
