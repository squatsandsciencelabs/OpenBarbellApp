import {
    LOGOUT,
    EXPAND_HISTORY_SET,
    COLLAPSE_HISTORY_SET
} from 'app/ActionTypes';

const defaultState = {
};

const HistoryCollapsedReducer = (state = defaultState, action) => {
    let changes = null;

    switch (action.type) {
        case LOGOUT:
            return defaultState;
        case EXPAND_HISTORY_SET:
            changes = {};
            changes[action.setID] = false;
            return Object.assign({}, state, changes);
        case COLLAPSE_HISTORY_SET:
            changes = {};
            changes[action.setID] = true;
            return Object.assign({}, state, changes);
        default:
            return state;
    }
};

export default HistoryCollapsedReducer;
