import {
    SAVE_END_SET_TIMER,
    PRESENT_END_SET_TIMER,
    DISMISS_END_SET_TIMER,
    LOGIN_SUCCESS,
    UPDATE_SET_DATA_FROM_SERVER,
    SET_DEFAULT_METRIC,
    EDIT_DEFAULT_METRIC,
    DISMISS_SET_METRIC
} from 'app/ActionTypes';

const defaultState = {
    defaultMetric: 'kgs',
    editingDefaultMetric: false,
    endSetTimerDuration: 30,
    editingEndSetTimer: false,
    syncDate: '',
};

const SettingsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_DEFAULT_METRIC: 
            return Object.assign({}, state, {
                defaultMetric: action.defaultMetric,
            });
        case EDIT_DEFAULT_METRIC:
            return Object.assign({}, state, {
                editingDefaultMetric: true,
            }); 
        case DISMISS_SET_METRIC:
            return Object.assign({}, state, {
                editingDefaultMetric: false,
            });                        
        case SAVE_END_SET_TIMER:
            return Object.assign({}, state, {
                endSetTimerDuration: action.endSetTimerDuration,
            });
        case PRESENT_END_SET_TIMER:
            return Object.assign({}, state, {
                editingEndSetTimer: true,
            });
        case DISMISS_END_SET_TIMER:
            return Object.assign({}, state, {
                editingEndSetTimer: false,
            });
        case UPDATE_SET_DATA_FROM_SERVER:
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                syncDate: action.syncDate
            });
        default:
            return state;
    }
};

export default SettingsReducer;
