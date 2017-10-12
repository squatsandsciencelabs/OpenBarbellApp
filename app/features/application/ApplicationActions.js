import { Keyboard } from 'react-native';
import * as Analytics from 'app/utility/Analytics';

import {
    CHANGED_TAB
} from 'app/ActionTypes';

export const changeTab = (i) => {
    switch(i) {
        case 0:
            Analytics.setCurrentScreen('workout');
            break;
        case 1:
            Analytics.setCurrentScreen('history');
            break;
        case 2: 
            Analytics.setCurrentScreen('settings');
            break;
    }
    Keyboard.dismiss();    
    return { type: CHANGED_TAB };
};
