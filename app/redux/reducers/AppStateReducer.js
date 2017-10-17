import {
    UNLOCKED_SCREEN,
    LOCKED_SCREEN,
    MULTI_TASK_SCREEN,
    END_WORKOUT,
} from 'app/ActionTypes';

const defaultState = {
    screenStatus: 'active',
    lockedCounter: 0,
    multiTaskCounter: 0,
    activeTime: 0,
}

const AppStateReducer = (state = defaultState, action) => {
    switch (action.type) {
        case UNLOCKED_SCREEN:
            return Object.assign({}, state, {
                screenStatus: 'active',
            });
        case LOCKED_SCREEN:
            return Object.assign({}, state, {
                screenStatus: 'inactive',
                lockedCounter: state.lockedCounter += 1,
            });
        case MULTI_TASK_SCREEN:
            return Object.assign({}, state, {
                screenStatus: 'multiView',
                multiTaskCounter: state.multiTaskCounter += 1,
            })
        case END_WORKOUT:
            return Object.assign({}, state, {
                lockedCounter: 0,
            });
        default: 
            return state;
    }
};

export default AppStateReducer;