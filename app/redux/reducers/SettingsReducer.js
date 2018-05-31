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
} from 'app/configs+constants/ActionTypes';

const defaultState = {
    defaultMetric: 'kgs',
    isEditingDefaultMetric: false,
    endSetTimerDuration: 30,
    isEditingEndSetTimer: false,
    syncDate: '',
    wasTimerEdited: false,
    wasMetricEdited: false,
    isExportingCSV: false,
    lastExportCSVDate: null,
};

const SettingsReducer = (state = defaultState, action) => {
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
        case UPDATE_SYNC_DATE:
            return Object.assign({}, state, {
                syncDate: action.syncDate
            });
        case EXPORTING_CSV:
            return Object.assign({}, state, {
                isExportingCSV: action.isExportingCSV,
                lastExportCSVDate: new Date()
            });
        default:
            return state;
    }
};

export default SettingsReducer;
