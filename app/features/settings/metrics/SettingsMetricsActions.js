import {
    PRESENT_COLLAPSED_METRIC,
    PRESENT_QUANTIFIER,
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
