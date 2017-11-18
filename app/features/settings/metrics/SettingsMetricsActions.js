import {
    PRESENT_COLLAPSED_METRICS,
    PRESENT_QUANTIFIERS
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const presentCollapsedMetrics = (metricPosition) => {
    return {
        metricPosition: metricPosition,
        type: PRESENT_COLLAPSED_METRICS
    }
};

export const presentQuantifiers = (quantifierPosition) => {   
    return {
        quantifierPosition: quantifierPosition,
	    type: PRESENT_QUANTIFIERS
    }
};

// ANALYTICS

// const logShowDeletedAnalytics = (state) => {
//     Analytics.logEventWithAppState('show_deleted', {
//     }, state);
// };

// const logHideDeletedAnalytics = (state) => {
//     Analytics.logEventWithAppState('hide_deleted', {
//     }, state);
// };
