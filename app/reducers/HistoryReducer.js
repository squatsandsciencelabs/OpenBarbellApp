import {
	UPDATE_HISTORY_FILTER,
	EXPORTING_CSV,
	LOADING_HISTORY,
	EDIT_HISTORY_EXERCISE_NAME,
	EDIT_HISTORY_TAGS
} from '../ActionTypes';

const defaultState = {
	showRemoved: false,
	isExportingCSV: false,
	isLoadingHistory: true,
	editingExercise: '',
	editingExerciseSetID: null,
	editingTags: [],
	editingTagsSetID: null
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
				editingExerciseSetID: action.setID,
				editingExercise: action.exercise
			});
		case EDIT_HISTORY_TAGS:
			return Object.assign({}, state, {
				editingTagsSetID: action.setID,
				editingTags: action.tags
			});
		default:
			return state;
	}
};

export default HistoryReducer;
