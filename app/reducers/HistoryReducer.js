import {
	UPDATE_HISTORY_FILTER,
	EXPORTING_CSV,
	LOADING_HISTORY,
	EDIT_HISTORY_EXERCISE_NAME,
	EDIT_HISTORY_TAGS,
	EXPANDED_HISTORY_SET
} from '../ActionTypes';

const defaultState = {
	showRemoved: false,
	isExportingCSV: false,
	isLoadingHistory: true,
	editingExercise: '',
	editingExerciseSetID: null,
	editingTags: [],
	editingTagsSetID: null,
	expandedSetID: null,
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
		case EXPANDED_HISTORY_SET:
			return Object.assign({}, state, {
				expandedSetID: action.setID,
			});
		default:
			return state;
	}
};

export default HistoryReducer;
