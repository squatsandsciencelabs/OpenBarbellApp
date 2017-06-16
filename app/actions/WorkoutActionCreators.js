// app/actions/WorkoutActionCreators.js

import {
	EDIT_WORKOUT_SET,
	END_EDIT_WORKOUT_SET,
	END_WORKOUT,
	EDIT_WORKOUT_EXERCISE_NAME,
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

export const beginEditWorkoutExerciseName = (setID, exercise) => ({
    type: EDIT_WORKOUT_EXERCISE_NAME,
    setID: setID,
	exercise: exercise
});

export const endEditWorkoutExerciseName = () => ({
    type: EDIT_WORKOUT_EXERCISE_NAME,
    exercise: '',
	setID: null
});
