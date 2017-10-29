import { Keyboard } from 'react-native';
import * as Analytics from 'app/utility/Analytics';
import { HISTORY_VIEWED } from 'app/ActionTypes';

import {
    CHANGE_TAB
} from 'app/ActionTypes';

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
