// These exist as a shared action creator because saving values can be done from all over the app

import { 
	SAVE_END_SET_TIMER, 
<<<<<<< HEAD
	SAVE_DEFAULT_METRIC
=======
	SET_DEFAULT_METRIC
>>>>>>> default metric is set and updates for all sets
} from 'app/ActionTypes';

import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

<<<<<<< HEAD
export const saveDefaultMetric = (metric = 'kgs') => (dispatch, getState) => {
=======
export const setDefaultMetric = (metric = 'kgs') => (dispatch, getState) => {
>>>>>>> default metric is set and updates for all sets
    var state = getState();
    var set = state.sets.workoutData;
    var setID = set[set.length - 1].setID;

    dispatch({ 
<<<<<<< HEAD
        type: SAVE_DEFAULT_METRIC, 
=======
        type: SET_DEFAULT_METRIC, 
>>>>>>> default metric is set and updates for all sets
        defaultMetric: metric,
        setID: setID
    });
}

export const saveEndSetTimer = (duration = 30) => ({
    type: SAVE_END_SET_TIMER,
    endSetTimerDuration: duration
});
