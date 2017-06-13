import {
	UPDATE_HISTORY_FILTER,
	EXPORTING_CSV,
	LOADING_HISTORY,
	EDIT_HISTORY_EXERCISE_NAME
} from '../ActionTypes';

const defaultState = {
	showRemoved: false,
	isExportingCSV: false,
	isLoadingHistory: true,
	editingExercise: '',
	editingSetID: null
};

const HistoryReducer = (state = defaultState, action) => {
	switch (action.type) {
		case LOADING_HISTORY:
			return Object.assign({}, state, {
				isLoadingHistory: action.isLoading
			});
		case UPDATE_HISTORY_FILTER:
			return Object.assign({}, state, {
				showRemoved: action.showRemoved
			});
		case EXPORTING_CSV:
			return Object.assign({}, state, {
				isExportingCSV: action.isExportingCSV
			});
		case EDIT_HISTORY_EXERCISE_NAME:
			return Object.assign({}, state, {
				editingSetID: action.setID,
				editingExercise: action.exercise
			});
		default:
			return state;
	}
};

export default HistoryReducer;
