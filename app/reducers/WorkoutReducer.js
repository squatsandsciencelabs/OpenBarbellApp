// app/reducers/WorkoutReducer.js

import {
	EDIT_WORKOUT_SET,
	END_EDIT_WORKOUT_SET,
	WORKOUT_AVG_FILTER,
	WORKOUT_PKV_FILTER,
	WORKOUT_PKH_FILTER,
	WORKOUT_ROM_FILTER,
	WORKOUT_DUR_FILTER,
} from '../ActionTypes';

const defaultState = {
	editing: false,
	editingSetID: null,
	filter: WORKOUT_AVG_FILTER
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
		case WORKOUT_AVG_FILTER:
			return Object.assign({}, state, {
				filter: WORKOUT_AVG_FILTER
			});
		case WORKOUT_PKV_FILTER:
			return Object.assign({}, state, {
				filter: WORKOUT_PKV_FILTER
			});
		case WORKOUT_PKH_FILTER:
			return Object.assign({}, state, {
				filter: WORKOUT_PKH_FILTER
			});
		case WORKOUT_ROM_FILTER:
			return Object.assign({}, state, {
				filter: WORKOUT_ROM_FILTER
			});
		case WORKOUT_DUR_FILTER:
			return Object.assign({}, state, {
				filter: WORKOUT_DUR_FILTER
			});

		default:
			return state;
	}
};

export default WorkoutReducer;
