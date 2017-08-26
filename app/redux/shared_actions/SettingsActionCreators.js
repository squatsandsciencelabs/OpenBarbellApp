// These exist as a shared action creator because saving values can be done from all over the app

import { 
	SAVE_END_SET_TIMER, 
	SAVE_DEFAULT_METRIC
} from 'app/ActionTypes';

import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

export const saveDefaultMetric = (metric = 'kgs') => (dispatch, getState) => {
    var state = getState();
    var set = state.sets.workoutData;
    var setID = set[set.length - 1].setID;

    dispatch({ 
        type: SAVE_DEFAULT_METRIC, 
        defaultMetric: metric,
        setID: setID
    });
}

export const saveEndSetTimer = (duration = 30) => ({
    type: SAVE_END_SET_TIMER,
    endSetTimerDuration: duration
});
