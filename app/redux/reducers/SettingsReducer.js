import {
    SAVE_END_SET_TIMER,
    PRESENT_END_SET_TIMER,
    DISMISS_END_SET_TIMER,
    SAVE_SYNC_DATE,
    LOGIN_SUCCESS
} from 'app/ActionTypes';

const defaultState = {
    endSetTimerDuration: 30,
    editingEndSetTimer: false,
    syncDate: ''
};

const SettingsReducer = (state = defaultState, action) => {
    switch (action.type) {
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
        case SAVE_SYNC_DATE:
        case LOGIN_SUCCESS:        
            return Object.assign({}, state, {
                syncDate: action.syncDate
            });
        default:
            return state;
    }
};

export default SettingsReducer;
