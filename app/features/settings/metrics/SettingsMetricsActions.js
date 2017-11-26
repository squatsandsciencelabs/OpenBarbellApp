import {
    Linking,
} from 'react-native';

import {
    PRESENT_COLLAPSED_METRIC,
    PRESENT_QUANTIFIER,
    PRESENT_BIG_METRIC_INFO,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const presentCollapsedMetric = (rank) => ({
    type: PRESENT_COLLAPSED_METRIC,
    metricRank: rank,
});

export const presentQuantifier = (rank) => ({
    type: PRESENT_QUANTIFIER,    
    quantifierRank: rank,
});

export const presentBigMetricsInfo = () => (dispatch, getState) => {
    Linking.openURL("http://www.squatsandscience.com/metrics/");    

    dispatch({
        type: PRESENT_BIG_METRIC_INFO
    });
};
