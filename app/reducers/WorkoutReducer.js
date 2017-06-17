// app/reducers/WorkoutReducer.js

import {
	EDIT_WORKOUT_SET,
	END_EDIT_WORKOUT_SET,
	EDIT_WORKOUT_EXERCISE_NAME
} from '../ActionTypes';

const defaultState = {
	editing: false,
	editingSetID: null,
	editingExercise: '',
};

const WorkoutReducer = (state = defaultState, action) => {
	switch (action.type) {
		case EDIT_WORKOUT_SET:
			return Object.assign({}, state, {
				editing: true,
				editingSetID: action.editingSetID,
			});
		case END_EDIT_WORKOUT_SET:
			return Object.assign({}, state, {
				editing: false
			});
		case EDIT_WORKOUT_EXERCISE_NAME:
			return Object.assign({}, state, {
				editingSetID: action.setID,
				editingExercise: action.exercise
			});
		default:
			return state;
	}
};

export default WorkoutReducer;
