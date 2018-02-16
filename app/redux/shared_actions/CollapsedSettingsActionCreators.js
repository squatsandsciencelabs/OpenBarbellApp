import { 
    SAVE_COLLAPSED_METRIC,
    SAVE_COLLAPSED_METRIC_1,
    SAVE_COLLAPSED_METRIC_2,
    SAVE_COLLAPSED_METRIC_3,
    SAVE_COLLAPSED_METRIC_4,
    SAVE_COLLAPSED_METRIC_5,
    SAVE_QUANTIFIER,
    SAVE_QUANTIFIER_1,
    SAVE_QUANTIFIER_2,
    SAVE_QUANTIFIER_3,
    SAVE_QUANTIFIER_4,
    SAVE_QUANTIFIER_5,
} from 'app/configs+constants/ActionTypes';

export const saveCollapsedMetric = (metric) => ({
    type: SAVE_COLLAPSED_METRIC,
    metric: metric,
});

export const saveCollapsedMetric1 = (metric) => ({
    type: SAVE_COLLAPSED_METRIC_1,
    metric: metric,
});

export const saveCollapsedMetric2 = (metric) => ({
    type: SAVE_COLLAPSED_METRIC_2,
    metric: metric,
});

export const saveCollapsedMetric3 = (metric) => ({
    type: SAVE_COLLAPSED_METRIC_3,
    metric: metric,
});

export const saveCollapsedMetric4 = (metric) => ({
    type: SAVE_COLLAPSED_METRIC_4,
    metric: metric,
});

export const saveCollapsedMetric5 = (metric) => ({
    type: SAVE_COLLAPSED_METRIC_5,
    metric: metric,
});

export const saveQuantifier = (quantifier) => ({
    type: SAVE_QUANTIFIER,
    quantifier: quantifier,
});

export const saveQuantifier1 = (quantifier) => ({
    type: SAVE_QUANTIFIER_1,
    quantifier: quantifier,
});

export const saveQuantifier2 = (quantifier) => ({
    type: SAVE_QUANTIFIER_2,
    quantifier: quantifier,
});

export const saveQuantifier3 = (quantifier) => ({
    type: SAVE_QUANTIFIER_3,
    quantifier: quantifier,
});

export const saveQuantifier4 = (quantifier) => ({
    type: SAVE_QUANTIFIER_4,
    quantifier: quantifier,
});

export const saveQuantifier5 = (quantifier) => ({
    type: SAVE_QUANTIFIER_5,
    quantifier: quantifier,
});
