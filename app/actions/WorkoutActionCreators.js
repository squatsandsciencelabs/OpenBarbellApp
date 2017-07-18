// app/actions/WorkoutActionCreators.js

import {
	END_WORKOUT,
	EDIT_WORKOUT_EXERCISE_NAME,
	EDIT_WORKOUT_TAGS,
	EXPANDED_WORKOUT_SET
} from '../ActionTypes';
import * as ApiActionCreators from '../actions/ApiActionCreators';

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

export const beginEditWorkoutTags = (setID, tags) => ({
    type: EDIT_WORKOUT_TAGS,
    setID: setID,
	tags: tags
});

export const endEditWorkoutTags = () => ({
    type: EDIT_WORKOUT_TAGS,
    tags: [],
	setID: null
});

export const beginViewExpandedSet = (setID) => ({
    type: EXPANDED_WORKOUT_SET,
    setID: setID,
});

export const endViewExpandedSet = () => ({
    type: EXPANDED_WORKOUT_SET,
	setID: null
});
