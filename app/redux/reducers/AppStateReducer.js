import {
    UNLOCKED_SCREEN,
    LOCKED_SCREEN,
    MULTI_TASK_SCREEN,
    END_WORKOUT,
    CHANGE_TAB
} from 'app/ActionTypes';
import * as NavigationConfig from 'app/configs/NavigationConfig';

const defaultState = {
    screenStatus: 'active',
    lockedCounter: 0,
    multiTaskCounter: 0,
    tabIndex: NavigationConfig.initialIndex
}

const AppStateReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_TAB:
            return Object.assign({}, state, {
                tabIndex: action.tabIndex,
            });
        case UNLOCKED_SCREEN:
            return Object.assign({}, state, {
                screenStatus: 'active',
            });
        case LOCKED_SCREEN:
            return Object.assign({}, state, {
                screenStatus: 'inactive',
                lockedCounter: state.lockedCounter + 1,
            });
        case MULTI_TASK_SCREEN:
            return Object.assign({}, state, {
                screenStatus: 'multiView',
                multiTaskCounter: state.multiTaskCounter + 1,
            })
        case END_WORKOUT:
            return Object.assign({}, state, {
                lockedCounter: 0,
                multiTaskCounter: 0
            });
        default: 
            return state;
    }
};

export default AppStateReducer;