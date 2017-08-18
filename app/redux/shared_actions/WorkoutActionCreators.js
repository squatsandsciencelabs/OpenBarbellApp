// This exists in shared actions because the timer can also end the workout

import * as ApiActionCreators from './ApiActionCreators';
import { END_WORKOUT } from 'app/ActionTypes';

export const endWorkout = () => (dispatch, getState) => {
    var state = getState();
    var workoutData = state.sets.workoutData;

    if (workoutData.length > 0 && workoutData[0].reps.length > 0) {
        dispatch({ type: END_WORKOUT });
        dispatch(ApiActionCreators.syncData());
    }
};
