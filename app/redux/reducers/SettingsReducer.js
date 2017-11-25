import {
    SAVE_END_SET_TIMER,
    PRESENT_END_SET_TIMER,
    DISMISS_END_SET_TIMER,
    LOGIN_SUCCESS,
    UPDATE_SET_DATA_FROM_SERVER,
    SAVE_DEFAULT_METRIC,
    PRESENT_DEFAULT_METRIC,
    DISMISS_DEFAULT_METRIC,
    UPDATE_SYNC_DATE,
    EXPORTING_CSV,
    UPDATE_HISTORY_FILTER,
    PRESENT_COLLAPSED_METRICS,
    PRESENT_QUANTIFIERS,
    DISMISS_COLLAPSED_METRICS,
    DISMISS_QUANTIFIERS,
    SAVE_COLLAPSED_METRIC,
    SAVE_QUANTIFIER
} from 'app/ActionTypes';

const defaultState = {
    defaultMetric: 'kgs',
    isEditingDefaultMetric: false,
    endSetTimerDuration: 30,
    isEditingEndSetTimer: false,
    syncDate: '',
    wasTimerEdited: false,
    wasMetricEdited: false,
    showRemoved: false,
    isExportingCSV: false,
    lastExportCSVDate: null,
    metric1: 'Velocity',
    quantifier1: 'Last Rep',
    metric2: 'PKV',
    quantifier2: 'Last Rep',
    metric3: 'PKH',
    quantifier3: 'Last Rep',
    metric4: 'ROM',
    quantifier4: 'Last Rep',
    metric5: 'Duration',
    quantifier5: 'Last Rep',
    isEditingMetric: false,
    isEditingAvgMetric: false,
    isEditingBestEverMetric: false,
    isEditingQuantifier: false,
    currentMetricPosition: null,
    currentQuantifierPosition: null
};

const SettingsReducer = (state = defaultState, action) => {
    let changes = null;

    switch (action.type) {
        case SAVE_DEFAULT_METRIC: 
            return Object.assign({}, state, {
                defaultMetric: action.defaultMetric,
            });
        case PRESENT_DEFAULT_METRIC:
            return Object.assign({}, state, {
                isEditingDefaultMetric: true,
            }); 
        case DISMISS_DEFAULT_METRIC:
            return Object.assign({}, state, {
                isEditingDefaultMetric: false,
            });
        case PRESENT_COLLAPSED_METRICS: 
            changes = { currentMetricPosition: action.metricPosition }
                if (action.quantifier === 'Average' || action.quantifier === 'Abs Loss') {
                    changes.isEditingAvgMetric = true;
                } else if (action.quantifier === 'Best Ever') {
                    changes.isEditingBestEverMetric = true;
                } else {
                    changes.isEditingMetric = true;
                }
            return Object.assign({}, state, changes);
        case DISMISS_COLLAPSED_METRICS: 
            return Object.assign({}, state, {
                isEditingMetric: false,
                isEditingAvgMetric: false,
                isEditingBestEverMetric: false,
                currentMetricPosition: null
            });
        case PRESENT_QUANTIFIERS: 
            return Object.assign({}, state, {
                isEditingQuantifier: true,
                currentQuantifierPosition: action.quantifierPosition,
                currentMetricPosition: action.metricPosition
            });
        case DISMISS_QUANTIFIERS: 
            return Object.assign({}, state, {
                isEditingQuantifier: false,
                currentMetricPosition: null,
                currentQuantifierPosition: null
            });
        case SAVE_COLLAPSED_METRIC:
            changes = {}
            changes[action.position] = action.metric
            return Object.assign({}, state, changes);
        case SAVE_QUANTIFIER:
            changes = {}
            changes[action.position] = action.quantifier
            changes[state.currentMetricPosition] = 'Velocity'
            return Object.assign({}, state, changes);                                      
        case SAVE_END_SET_TIMER:           
            return Object.assign({}, state, {
                endSetTimerDuration: action.endSetTimerDuration,
                wasTimerEdited: true,
            });
        case PRESENT_END_SET_TIMER:
            return Object.assign({}, state, {
                isEditingEndSetTimer: true,
            });
        case DISMISS_END_SET_TIMER:
            return Object.assign({}, state, {
                isEditingEndSetTimer: false,
            });
        case UPDATE_SET_DATA_FROM_SERVER:
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                syncDate: action.syncDate
            });
        case UPDATE_SYNC_DATE:
            return Object.assign({}, state, {
                syncDate: action.syncDate
            });
        case EXPORTING_CSV:
            return Object.assign({}, state, {
                isExportingCSV: action.isExportingCSV,
                lastExportCSVDate: new Date()
            });
        case UPDATE_HISTORY_FILTER:
            return Object.assign({}, state, {
                showRemoved: action.showRemoved
            });
        default:
            return state;
    }
};

export default SettingsReducer;
