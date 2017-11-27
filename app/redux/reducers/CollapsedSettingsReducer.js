import {
    PRESENT_COLLAPSED_METRIC,
    PRESENT_QUANTIFIER,
    DISMISS_COLLAPSED_METRIC,
    DISMISS_QUANTIFIER,
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
    metric2: RPE_METRIC,
    quantifier2: EMPTY_QUANTIFIER,
    metric3: ROM_METRIC,
    quantifier3: MIN_QUANTIFIER,
    metric4: DURATION_METRIC,
    quantifier4: MIN_QUANTIFIER,
    metric5: AVG_VELOCITY_METRIC,
    quantifier5: ABS_LOSS_QUANTIFIER,
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
                    if (shouldResetQuantifier(state.quantifier1, action.metric)) {
                        changes.quantifier1 = EMPTY_QUANTIFIER;
                    }
                    break;
                case 2:
                    changes.metric2 = action.metric;
                    if (shouldResetQuantifier(state.quantifier2, action.metric)) {
                        changes.quantifier2 = EMPTY_QUANTIFIER;
                    }
                    break;
                case 3:
                    changes.metric3 = action.metric;
                    if (shouldResetQuantifier(state.quantifier3, action.metric)) {
                        changes.quantifier3 = EMPTY_QUANTIFIER;
                    }
                    break;
                case 4:
                    changes.metric4 = action.metric;
                    if (shouldResetQuantifier(state.quantifier4, action.metric)) {
                        changes.quantifier4 = EMPTY_QUANTIFIER;
                    }
                    break;
                case 5:
                    changes.metric5 = action.metric;
                    if (shouldResetQuantifier(state.quantifier5, action.metric)) {
                        changes.quantifier5 = EMPTY_QUANTIFIER;
                    }
                    break;
                default:
                    return state;
            }
            return Object.assign({}, state, changes);
        case SAVE_COLLAPSED_METRIC_1:
            changes = {};
            changes.metric1 = action.metric;
            if (shouldResetQuantifier(state.quantifier1, action.metric)) {
                changes.quantifier1 = EMPTY_QUANTIFIER;
            }
            return Object.assign({}, state, changes);
        case SAVE_COLLAPSED_METRIC_2:
            changes = {};
            changes.metric2 = action.metric;
            if (shouldResetQuantifier(state.quantifier2, action.metric)) {
                changes.quantifier2 = EMPTY_QUANTIFIER;
            }
            return Object.assign({}, state, changes);
        case SAVE_COLLAPSED_METRIC_3:
            changes = {};
            changes.metric3 = action.metric;
            if (shouldResetQuantifier(state.quantifier3, action.metric)) {
                changes.quantifier3 = EMPTY_QUANTIFIER;
            }
            return Object.assign({}, state, changes);
        case SAVE_COLLAPSED_METRIC_4:
            changes = {};
            changes.metric4 = action.metric;
            if (shouldResetQuantifier(state.quantifier4, action.metric)) {
                changes.quantifier4 = EMPTY_QUANTIFIER;
            }
            return Object.assign({}, state, changes);
        case SAVE_COLLAPSED_METRIC_5:
            changes = {};
            changes.metric5 = action.metric;
            if (shouldResetQuantifier(state.quantifier5, action.metric)) {
                changes.quantifier5 = EMPTY_QUANTIFIER;
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
        case SAVE_QUANTIFIER_1:
            changes = {};
            changes.quantifier1 = action.quantifier;
            if (shouldResetMetric(action.quantifier, state.metric1)) {
                changes.metric1 = EMPTY_METRIC;
            }
            return Object.assign({}, state, changes);
        case SAVE_QUANTIFIER_2:
            changes = {};
            changes.quantifier2 = action.quantifier;
            if (shouldResetMetric(action.quantifier, state.metric2)) {
                changes.metric2 = EMPTY_METRIC;
            }
            return Object.assign({}, state, changes);
        case SAVE_QUANTIFIER_3:
            changes = {};
            changes.quantifier3 = action.quantifier;
            if (shouldResetMetric(action.quantifier, state.metric3)) {
                changes.metric3 = EMPTY_METRIC;
            }
            return Object.assign({}, state, changes);
        case SAVE_QUANTIFIER_4:
            changes = {};
            changes.quantifier4 = action.quantifier;
            if (shouldResetMetric(action.quantifier, state.metric4)) {
                changes.metric4 = EMPTY_METRIC;
            }
            return Object.assign({}, state, changes);
        case SAVE_QUANTIFIER_5:
            changes = {};
            changes.quantifier5 = action.quantifier;
            if (shouldResetMetric(action.quantifier, state.metric5)) {
                changes.metric5 = EMPTY_METRIC;
            }
            return Object.assign({}, state, changes);
        default:
            return state;
    }
};

const shouldResetQuantifier = (quantifier, metric) => {
    if (metric === RPE_METRIC) {
        return true;
    }
    return false;
};

const shouldResetMetric = (quantifier, metric) => {
    if (metric === RPE_METRIC) {
        return true;
    }
    if ((quantifier === AVG_QUANTIFIER || quantifier === ABS_LOSS_QUANTIFIER) && metric === PKH_METRIC) {
        return true;
    }
    if (quantifier === BEST_EVER_QUANTIFIER && (metric === PKH_METRIC || metric === ROM_METRIC)) {
        return true;
    }
    return false;
};

export default CollapsedSettingsReducer;
