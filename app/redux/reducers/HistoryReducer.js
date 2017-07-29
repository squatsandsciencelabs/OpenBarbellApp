import {
    UPDATE_HISTORY_FILTER,
    EXPORTING_CSV,
    LOADING_HISTORY,
    PRESENT_HISTORY_EXERCISE,
    PRESENT_HISTORY_TAGS,
    PRESENT_HISTORY_EXPANDED,
    DISMISS_HISTORY_EXERCISE,
    DISMISS_HISTORY_TAGS,
    DISMISS_HISTORY_EXPANDED
} from 'app/ActionTypes';

const defaultState = {
    showRemoved: false,
    isExportingCSV: false,
    isLoadingHistory: true,
    editingExerciseName: '',
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
        case PRESENT_HISTORY_EXERCISE:
            return Object.assign({}, state, {
                editingExerciseSetID: action.setID,
                editingExerciseName: action.exercise
            });
        case PRESENT_HISTORY_TAGS:
            return Object.assign({}, state, {
                editingTagsSetID: action.setID,
                editingTags: action.tags
            });
        case PRESENT_HISTORY_EXPANDED:
            return Object.assign({}, state, {
                expandedSetID: action.setID,
            });
        case DISMISS_HISTORY_EXERCISE:
            return Object.assign({}, state, {
                editingExerciseSetID: null,
                editingExerciseName: ''
            });
        case DISMISS_HISTORY_TAGS:
            return Object.assign({}, state, {
                editingTagsSetID: null,
                editingTags: []
            });
        case DISMISS_HISTORY_EXPANDED:
            return Object.assign({}, state, {
                expandedSetID: null,
            });
        default:
            return state;
    }
};

export default HistoryReducer;
