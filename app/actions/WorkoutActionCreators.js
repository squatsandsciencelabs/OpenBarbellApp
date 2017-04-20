// app/actions/WorkoutActionCreators.js

import {
	EDIT_WORKOUT_SET,
	END_EDIT_WORKOUT_SET,
	END_WORKOUT,
	WORKOUT_AVG_FILTER,
	WORKOUT_PKV_FILTER,
	WORKOUT_PKH_FILTER,
	WORKOUT_ROM_FILTER,
	WORKOUT_DUR_FILTER,
} from '../ActionTypes';
import * as ApiActionCreators from '../actions/ApiActionCreators';

export const editWorkoutSet = (setID) => ({ type: EDIT_WORKOUT_SET, editingSetID: setID });

export const endEditWorkoutSet = () => ({ type: END_EDIT_WORKOUT_SET });

export const endWorkout = () => (dispatch, getState) => {
	var state = getState();
	var workoutData = state.sets.workoutData;

	if (workoutData.length > 0 && workoutData[0].reps.length > 0) {
		dispatch({ type: END_WORKOUT });
		dispatch(ApiActionCreators.syncData());
	}
};

export const filterAVGWorkout = () => ({ type: WORKOUT_AVG_FILTER });
export const filterPKVWorkout = () => ({ type: WORKOUT_PKV_FILTER });
export const filterPKHWorkout = () => ({ type: WORKOUT_PKH_FILTER });
export const filterROMWorkout = () => ({ type: WORKOUT_ROM_FILTER });
export const filterDURWorkout = () => ({ type: WORKOUT_DUR_FILTER });
