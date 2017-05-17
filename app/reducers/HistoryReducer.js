import {
	EDIT_HISTORY_SET,
	END_EDIT_HISTORY_SET,
	UPDATE_HISTORY_FILTER,
	EXPORTING_CSV,
	LOADING_HISTORY
} from '../ActionTypes';

const defaultState = {
	editing: false,
	editingSetID: null,
	showRemoved: false,
	isExportingCSV: false,
	isLoadingHistory: true
};

const HistoryReducer = (state = defaultState, action) => {
	switch (action.type) {
		case LOADING_HISTORY:
			return Object.assign({}, state, {
				isLoadingHistory: action.isLoading
			});
		case EDIT_HISTORY_SET:
			return Object.assign({}, state, {
				editing: true,
				editingSetID: action.setID,
			});
		case END_EDIT_HISTORY_SET:
			return Object.assign({}, state, {
				editing: false
			});
		case UPDATE_HISTORY_FILTER:
			return Object.assign({}, state, {
				showRemoved: action.showRemoved
			});
		case EXPORTING_CSV:
			return Object.assign({}, state, {
				isExportingCSV: action.isExportingCSV
			});
		default:
			return state;
	}
};

export default HistoryReducer;
