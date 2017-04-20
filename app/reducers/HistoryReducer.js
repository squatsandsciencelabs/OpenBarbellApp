import {
	EDIT_HISTORY_SET,
	END_EDIT_HISTORY_SET,
	UPDATE_HISTORY_FILTER
} from '../ActionTypes';

const defaultState = {
	editing: false,
	editingSetID: null,
	showRemoved: false,
};

const HistoryReducer = (state = defaultState, action) => {
	switch (action.type) {
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
		default:
			return state;
	}
};

export default HistoryReducer;
