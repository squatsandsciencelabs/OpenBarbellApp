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
    metric1: 'Avg Velocities',
    quantifier1: 'Last Set',
    metric2: 'Min Avg Velocity',
    quantifier2: 'Last Set',
    metric3: 'Peak Height',
    quantifier3: 'Last Set',
    metric4: 'Best ROM',
    quantifier4: 'Last Set',
    metric5: 'Avg Duration',
    quantifier5: 'Last Set',
    isEditingCollapsedMetric: false,
    currentMetricEditing: null,
    isEditingQuantifier: false,
    currentQuantifierEditing: false
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
            return Object.assign({}, state, {
                isEditingCollapsedMetric: true,
                currentMetricEditing: action.metricPosition
            });
        case DISMISS_COLLAPSED_METRICS: 
            return Object.assign({}, state, {
                isEditingCollapsedMetric: false,
                currentMetricEditing: null
            });
        case PRESENT_QUANTIFIERS: 
            return Object.assign({}, state, {
                isEditingQuantifier: true,
                currentQuantifierEditing: action.quantifierPosition
            });
        case DISMISS_QUANTIFIERS: 
            return Object.assign({}, state, {
                isEditingQuantifier: false,
                currentQuantifierEditing: null
            });
        case SAVE_COLLAPSED_METRIC:
            changes = {}
            changes[action.position] = action.metric
            return Object.assign({}, state, changes);
        case SAVE_QUANTIFIER:
            changes = {}
            changes[action.position] = action.quantifier
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
