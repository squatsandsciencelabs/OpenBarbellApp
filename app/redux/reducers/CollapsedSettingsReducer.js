import {
    PRESENT_COLLAPSED_METRIC,
    PRESENT_QUANTIFIER,
    DISMISS_COLLAPSED_METRIC,
    DISMISS_QUANTIFIER,
    SAVE_COLLAPSED_METRIC,
    SAVE_QUANTIFIER,
} from 'app/ActionTypes';

import {
    EMPTY_METRIC,
    AVG_VELOCITY_METRIC,
    RPE_METRIC,
    DURATION_METRIC,
    ROM_METRIC,
    PKH_METRIC,
    PKV_METRIC,
    EMPTY_QUANTIFIER,
    FIRST_REP_QUANTIFIER,
    LAST_REP_QUANTIFIER,
    MIN_QUANTIFIER,
    MAX_QUANTIFIER,
    AVG_QUANTIFIER,
    ABS_LOSS_QUANTIFIER,
    BEST_EVER_QUANTIFIER,
} from 'app/constants/CollapsedMetricTypes';

const defaultState = {
    metric1: AVG_VELOCITY_METRIC,
    quantifier1: LAST_REP_QUANTIFIER,
    metric2: PKV_METRIC,
    quantifier2: LAST_REP_QUANTIFIER,
    metric3: PKH_METRIC,
    quantifier3: LAST_REP_QUANTIFIER,
    metric4: ROM_METRIC,
    quantifier4: LAST_REP_QUANTIFIER,
    metric5: DURATION_METRIC,
    quantifier5: LAST_REP_QUANTIFIER,
    currentCollapsedMetricRank: null,
    isEditingMetric: false,
    isEditingQuantifier: false,
};

const CollapsedSettingsReducer = (state = defaultState, action) => {
    let changes = null;
    switch (action.type) {
        case PRESENT_COLLAPSED_METRIC:
            return Object.assign({}, state, {
                currentCollapsedMetricRank: action.metricRank,
                isEditingMetric: true,
            });
        case PRESENT_QUANTIFIER:
            return Object.assign({}, state, {
                currentCollapsedMetricRank: action.quantifierRank,
                isEditingQuantifier: true,
            });
        case DISMISS_COLLAPSED_METRIC:
        case DISMISS_QUANTIFIER:
            return Object.assign({}, state, {
                currentCollapsedMetricRank: null,
                isEditingMetric: false,
                isEditingQuantifier: false,
            });
        case SAVE_COLLAPSED_METRIC:
            changes = {};
            switch (state.currentCollapsedMetricRank) {
                case 1:
                    changes.metric1 = action.metric;
                    break;
                case 2:
                    changes.metric2 = action.metric;
                    break;
                case 3:
                    changes.metric3 = action.metric;
                    break;
                case 4:
                    changes.metric4 = action.metric;
                    break;
                case 5:
                    changes.metric5 = action.metric;
                    break;
                default:
                    return state;
            }
            return Object.assign({}, state, changes);
        case SAVE_QUANTIFIER:
            changes = {};
            switch (state.currentCollapsedMetricRank) {
                case 1:
                    changes.quantifier1 = action.quantifier;
                    if (shouldResetMetric(action.quantifier, state.metric1)) {
                        changes.metric1 = EMPTY_METRIC;
                    }
                    break;
                case 2:
                    changes.quantifier2 = action.quantifier;
                    if (shouldResetMetric(action.quantifier, state.metric2)) {
                        changes.metric2 = EMPTY_METRIC;
                    }
                    break;
                case 3:
                    changes.quantifier3 = action.quantifier;
                    if (shouldResetMetric(action.quantifier, state.metric3)) {
                        changes.metric3 = EMPTY_METRIC;
                    }
                    break;
                case 4:
                    changes.quantifier4 = action.quantifier;
                    if (shouldResetMetric(action.quantifier, state.metric4)) {
                        changes.metric4 = EMPTY_METRIC;
                    }
                    break;
                case 5:
                    changes.quantifier5 = action.quantifier;
                    if (shouldResetMetric(action.quantifier, state.metric5)) {
                        changes.metric5 = EMPTY_METRIC;
                    }
                    break;
                default:
                    return state;
            }
            return Object.assign({}, state, changes);
        default:
            return state;
    }
};

const shouldResetMetric = (quantifier, metric) => {
    if ((quantifier === AVG_QUANTIFIER || quantifier === ABS_LOSS_QUANTIFIER) && metric === PKH_METRIC) {
        return true;
    }
    if (quantifier === BEST_EVER_QUANTIFIER && (metric === PKH_METRIC || metric === ROM_METRIC)) {
        return true;
    }
    return false;
};

export default CollapsedSettingsReducer;
