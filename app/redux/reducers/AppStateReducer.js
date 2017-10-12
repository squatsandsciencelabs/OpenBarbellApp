import {
    UNLOCKED_SCREEN,
    LOCKED_SCREEN
} from 'app/ActionTypes';

const defaultState = {
    screenStatus: 'active'
}

const AppStateReducer = (state = defaultState, action) => {
    switch (action.type) {
        case UNLOCKED_SCREEN:
            return Object.assign({}, state, {
                screenStatus: 'active'
            });
        case LOCKED_SCREEN:
            return Object.assign({}, state, {
                screenStatus: 'inactive'
            });
        default: 
            return state;
    }
};

export default AppStateReducer;