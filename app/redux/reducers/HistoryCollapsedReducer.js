import {
    EXPAND_HISTORY_SET,
    COLLAPSE_HISTORY_SET
} from 'app/ActionTypes';

const defaultState = {
};

const HistoryCollapsedReducer = (state = defaultState, action) => {
    switch (action.type) {
        case EXPAND_HISTORY_SET:
            let changes = {};
            changes[action.setID] = true;
            return Object.assign({}, state, changes);
        case COLLAPSE_HISTORY_SET:
            let changes = {};
            changes[action.setID] = false;
            return Object.assign({}, state, changes);
        default:
            return state;
    }
};

export default HistoryCollapsedReducer;
