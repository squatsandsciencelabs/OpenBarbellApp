import {
    PRESENT_COLLAPSED_METRICS,
    PRESENT_QUANTIFIERS
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const presentCollapsedMetrics = (metricPosition, quantifier) => {
    return {
        metricPosition: metricPosition,
        quantifier: quantifier,
        type: PRESENT_COLLAPSED_METRICS
    }
};

export const presentQuantifiers = (metricPosition, quantifierPosition) => {   
    return {
        metricPosition: metricPosition,
        quantifierPosition: quantifierPosition,
	    type: PRESENT_QUANTIFIERS
    }
};
