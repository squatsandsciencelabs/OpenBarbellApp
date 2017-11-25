// These exist as a shared action creator because saving values can be done from all over the app

import { 
	SAVE_END_SET_TIMER, 
    SAVE_DEFAULT_METRIC,
    SAVE_COLLAPSED_METRIC,
    SAVE_QUANTIFIER,
    UPDATE_SYNC_DATE
} from 'app/ActionTypes';

import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';

export const saveDefaultMetric = (metric = 'kgs') => ({
    type: SAVE_DEFAULT_METRIC,
    defaultMetric: metric,
});

export const saveCollapsedMetric = (metric = 'Avg Velocity') => (dispatch, getState) => {
    var state = getState();
    let position = SettingsSelectors.getCurrentMetricPosition(state);

    dispatch({
        type: SAVE_COLLAPSED_METRIC,
        position: position,
        metric: metric
    });
};

export const saveQuantifier = (quantifier = 'Last Rep') => (dispatch, getState) => {
    var state = getState();
    let position = SettingsSelectors.getCurrentQuantifierPosition(state);

    dispatch({
        type: SAVE_QUANTIFIER,
        position: position,
        quantifier: quantifier
    });
};

export const saveEndSetTimer = (duration = 30) => ({
    type: SAVE_END_SET_TIMER,
    endSetTimerDuration: duration
});

export const updateSyncDate = (syncDate=new Date()) => ({
    type: UPDATE_SYNC_DATE,
    syncDate: syncDate
});
