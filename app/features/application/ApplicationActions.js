import { Keyboard } from 'react-native';
import * as Analytics from 'app/utility/Analytics';

import {
    CHANGED_TAB
} from 'app/ActionTypes';

export const changeTab = (i) => {
    switch(i) {
        case 0:
            Analytics.setCurrentScreen('workout');
        case 1:
            Analytics.setCurrentScreen('history');
        case 2: 
            Analytics.setCurrentScreen('settings');
    }
    Keyboard.dismiss();    
    return { type: CHANGED_TAB };
};

export const setInitialScreen = () => {
    Analytics.setCurrentScreen('settings');
}