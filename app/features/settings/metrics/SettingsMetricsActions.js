import {
    PRESENT_COLLAPSED_METRICS,
    PRESENT_QUANTIFIERS
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const presentCollapsedMetrics = (metricPosition, quantifier) => ({
    metricPosition: metricPosition,
    quantifier: quantifier,
    type: PRESENT_COLLAPSED_METRICS
});

export const presentQuantifiers = (metricPosition, quantifierPosition) => ({   
    metricPosition: metricPosition,
    quantifierPosition: quantifierPosition,
	type: PRESENT_QUANTIFIERS
});
