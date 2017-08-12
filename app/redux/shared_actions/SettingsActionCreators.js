// These exist as a shared action creator because saving values can be done from all over the app

import {
    SAVE_END_SET_TIMER,
    SAVE_SYNC_DATE
} from 'app/ActionTypes';

export const saveEndSetTimer = (duration = 30) => ({
    type: SAVE_END_SET_TIMER,
    endSetTimerDuration: duration
});

// TODO: Remove this once redux-persist is in place
export const saveSyncDate = (syncDate) => ({
    type: SAVE_SYNC_DATE,
    syncDate: syncDate
});
