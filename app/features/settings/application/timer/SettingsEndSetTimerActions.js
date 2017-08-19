import {
    DISMISS_END_SET_TIMER,
    SAVE_END_SET_TIMER
} from 'app/ActionTypes';

export const saveEndSetTimer = (duration = 30) => ({    
    type: SAVE_END_SET_TIMER,
    endSetTimerDuration: duration
});

export const dismissEndSetTimer = () => ({
    type: DISMISS_END_SET_TIMER,    
});
