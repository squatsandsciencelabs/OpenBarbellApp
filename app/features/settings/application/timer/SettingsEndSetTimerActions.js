import {
    DISMISS_END_SET_TIMER
} from 'app/ActionTypes';

import * as SettingsActionCreators from 'app/redux/shared_actions/SettingsActionCreators';

export const saveEndSetTimer = (duration = 30) => {
    return SettingsActionCreators.saveEndSetTimer(duration);
};

export const dismissEndSetTimer = () => ({
    type: DISMISS_END_SET_TIMER,    
});
