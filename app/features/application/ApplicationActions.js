import { Keyboard } from 'react-native';
import * as Analytics from 'app/utility/analytics/Analytics';

import {
    CHANGED_TAB
} from 'app/ActionTypes';

export const changeTab = () => {
    Keyboard.dismiss();    
    return { type: CHANGED_TAB };
};
