// These exist as a shared action creator because saving values can be done from all over the app

import { SAVE_END_SET_TIMER } from 'app/ActionTypes';

export const saveEndSetTimer = (duration = 30) => ({
    type: SAVE_END_SET_TIMER,
    endSetTimerDuration: duration
});
