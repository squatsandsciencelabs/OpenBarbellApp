import {
    LOGOUT,
    LOGIN_SUCCESS,
    EXPAND_HISTORY_SET,
    COLLAPSE_HISTORY_SET,
    DELETE_HISTORY_SET,
} from 'app/configs+constants/ActionTypes';

const defaultState = {
};

const HistoryCollapsedReducer = (state = defaultState, action) => {
    let changes = null;

    switch (action.type) {
        case LOGOUT:
        case LOGIN_SUCCESS:
            return defaultState;
        case EXPAND_HISTORY_SET:
            changes = {};
            changes[action.setID] = false;
            return Object.assign({}, state, changes);
        case DELETE_HISTORY_SET:
        case COLLAPSE_HISTORY_SET:
            changes = {};
            changes[action.setID] = true;
            return Object.assign({}, state, changes);
        default:
            return state;
    }
};

export default HistoryCollapsedReducer;
