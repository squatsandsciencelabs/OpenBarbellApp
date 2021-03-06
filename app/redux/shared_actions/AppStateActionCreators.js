import {
    UNLOCKED_SCREEN,
    LOCKED_SCREEN,
    MULTI_TASK_SCREEN,
    CHANGE_TAB,
    HISTORY_VIEWED 
} from 'app/configs+constants/ActionTypes';
import { Keyboard } from 'react-native';
import * as Analytics from 'app/services/Analytics';
import * as AppStateSelectors from 'app/redux/selectors/AppStateSelectors';

export const unlockedScreen = () => ({
    type: UNLOCKED_SCREEN
});

export const lockedScreen = () => ({
    type: LOCKED_SCREEN
});

export const multiTask = () => ({
    type: MULTI_TASK_SCREEN
})

export const changeTab = (tabIndex) => (dispatch, getState) => {
    // analytics for leave history
    if (tabIndex !== 1) {
        const state = getState();
        if (AppStateSelectors.getTabIndex(state) === 1) {
            Analytics.logEventWithAppState('leave_history', {}, state);
        }
    }
    
    // screens and history viewed
    switch(tabIndex) {
        case 0:
            Analytics.setCurrentScreen('workout');
            break;
        case 1:
            Analytics.setCurrentScreen('history');
            dispatch({ type: HISTORY_VIEWED });
            break;
        case 2:
            Analytics.setCurrentScreen('analysis');
            break;
        case 3: 
            Analytics.setCurrentScreen('settings');
            break;
    }

    // keyboard
    Keyboard.dismiss();

    dispatch({
        type: CHANGE_TAB,
        tabIndex: tabIndex,
    });
};
