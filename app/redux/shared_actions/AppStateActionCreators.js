import {
    UNLOCKED_SCREEN,
    LOCKED_SCREEN,
    MULTI_TASK_SCREEN,
    CHANGE_TAB
} from 'app/ActionTypes';
import { Keyboard } from 'react-native';
import * as Analytics from 'app/utility/Analytics';
import { HISTORY_VIEWED } from 'app/ActionTypes';

export const unlockedScreen = () => ({
    type: UNLOCKED_SCREEN
});

export const lockedScreen = () => ({
    type: LOCKED_SCREEN
});

export const multiTask = () => ({
    type: MULTI_TASK_SCREEN
})

export const changeTab = (tabIndex) => (dispatch) => {
    switch(tabIndex) {
        case 0:
            Analytics.setCurrentScreen('workout');
            break;
        case 1:
            Analytics.setCurrentScreen('history');
            dispatch({ type: HISTORY_VIEWED });
            break;
        case 2: 
            Analytics.setCurrentScreen('settings');
            break;
    }
    Keyboard.dismiss();    
    dispatch({
        type: CHANGE_TAB,
        tabIndex: tabIndex
    });
};
