import { 
    SAVE_COLLAPSED_METRIC,
    SAVE_QUANTIFIER,
} from 'app/ActionTypes';

import * as CollapsedSettingsSelectors from 'app/redux/selectors/CollapsedSettingsSelectors';

export const saveCollapsedMetric = (metric) => (dispatch, getState) => {
    const state = getState();
    const metricType = CollapsedSettingsSelectors.getCurrentMetric(state);

    dispatch({
        type: SAVE_COLLAPSED_METRIC,
        metricType: metricType,
        metric: metric
    });
};

export const saveQuantifier = (quantifier) => (dispatch, getState) => {
    const state = getState();
    const quantifierType = CollapsedSettingsSelectors.getCurrentQuantifier(state);

    dispatch({
        type: SAVE_QUANTIFIER,
        quantfierType: quantifierType,
        quantifier: quantifier
    });
};
