import {
    DISMISS_END_SET_TIMER,
    SAVE_END_SET_TIMER
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const saveEndSetTimer = (duration = 30) => (dispatch, getState) => {
    const state = getState();
    logChangeEndSetTimerAnalytics(duration, state);

    dispatch({
        type: SAVE_END_SET_TIMER,
        endSetTimerDuration: duration,
    });
};

export const dismissEndSetTimer = () => {
    Analytics.setCurrentScreen('settings');
    
    return {
        type: DISMISS_END_SET_TIMER,    
    }
};

// ANALYTICS

const logChangeEndSetTimerAnalytics = (duration, state) => {
    Analytics.logEventWithAppState('change_end_set_timer', {
        to_timer: duration,
    }, state);
};
