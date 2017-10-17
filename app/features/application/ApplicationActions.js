import { Keyboard } from 'react-native';
import * as Analytics from 'app/utility/Analytics';
import { HISTORY_VIEWED } from 'app/ActionTypes';

import {
    CHANGED_TAB
} from 'app/ActionTypes';

export const changeTab = (i) => (dispatch) => {
    switch(i) {
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
    return { type: CHANGED_TAB };
};