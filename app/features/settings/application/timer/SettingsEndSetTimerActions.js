import {
    DISMISS_END_SET_TIMER,
    SAVE_END_SET_TIMER
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const saveEndSetTimer = (duration = 30) => ({    
    type: SAVE_END_SET_TIMER,
    endSetTimerDuration: duration
});

export const dismissEndSetTimer = () => {
    Analytics.setCurrentScreen('settings');
    
    return {
        type: DISMISS_END_SET_TIMER,    
    }
};
