import { Keyboard } from 'react-native';

import {
    CHANGED_TAB
} from 'app/ActionTypes';

export const changeTab = () => {
    Keyboard.dismiss();    
    return { type: CHANGED_TAB };
};
