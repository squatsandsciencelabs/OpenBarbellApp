import {
    Linking,
} from 'react-native';

import {
    PRESENT_COLLAPSED_METRIC,
    PRESENT_QUANTIFIER,
    PRESENT_BIG_METRIC_INFO,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const presentCollapsedMetric = (rank) => (dispatch, getState) => {
    const state = getState();

    Analytics.setCurrentScreen('edit_collapsed_metric');

    dispatch({
        type: PRESENT_COLLAPSED_METRIC,
        metricRank: rank,
    });
};

export const presentQuantifier = (rank) => (dispatch, getState) => {
    const state = getState();

    Analytics.setCurrentScreen('edit_quantifier');

    dispatch({
        type: PRESENT_QUANTIFIER,    
        quantifierRank: rank,
    });
};

export const presentBigMetricsInfo = () => (dispatch, getState) => {
    Linking.openURL("http://www.squatsandscience.com/metrics/");    

    const state = getState();
    logMetricTipsAnalytics(state);

    dispatch({
        type: PRESENT_BIG_METRIC_INFO
    });
};

const logMetricTipsAnalytics = (state) => {
    Analytics.logEventWithAppState('what_are_metric_tips', {}, state);
};
