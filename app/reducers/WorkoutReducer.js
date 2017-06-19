// app/reducers/WorkoutReducer.js

import {
	EDIT_WORKOUT_EXERCISE_NAME,
	EDIT_WORKOUT_TAGS,
} from '../ActionTypes';

const defaultState = {
	editingExerciseSetID: null,
	editingExercise: '',
	editingTagsSetID: null,
	editingTags: [],
};

const WorkoutReducer = (state = defaultState, action) => {
	switch (action.type) {
		case EDIT_WORKOUT_EXERCISE_NAME:
			return Object.assign({}, state, {
				editingExerciseSetID: action.setID,
				editingExercise: action.exercise
			});
		case EDIT_WORKOUT_TAGS:
			return Object.assign({}, state, {
				editingTagsSetID: action.setID,
				editingTags: action.tags
			});
		default:
			return state;
	}
};

export default WorkoutReducer;
