// These exist as a shared action creator because saving values can be done from all over the app

import { 
	SAVE_END_SET_TIMER, 
	SET_DEFAULT_METRIC
} from 'app/ActionTypes';

export const setDefaultMetric = (metric = 'kgs') => ({
	type: SET_DEFAULT_METRIC,
	defaultMetric: metric
});

export const saveEndSetTimer = (duration = 30) => ({
    type: SAVE_END_SET_TIMER,
    endSetTimerDuration: duration
});
