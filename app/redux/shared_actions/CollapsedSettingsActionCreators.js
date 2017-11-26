import { 
    SAVE_COLLAPSED_METRIC,
    SAVE_QUANTIFIER,
} from 'app/ActionTypes';

export const saveCollapsedMetric = (metric) => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: SAVE_COLLAPSED_METRIC,
        metric: metric
    });
};

export const saveQuantifier = (quantifier) => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: SAVE_QUANTIFIER,
        quantifier: quantifier
    });
};
