import {
    HISTORY_VIEWED,
    LOADING_HISTORY,
    PRESENT_HISTORY_EXERCISE,
    PRESENT_HISTORY_TAGS,
    DISMISS_HISTORY_EXERCISE,
    DISMISS_HISTORY_TAGS,
    PRESENT_HISTORY_VIDEO_RECORDER,
    DISMISS_HISTORY_VIDEO_RECORDER,
    START_RECORDING_HISTORY,
    STOP_RECORDING_HISTORY,
    PRESENT_HISTORY_VIDEO_PLAYER,
    DISMISS_HISTORY_VIDEO_PLAYER,
    DELETE_HISTORY_VIDEO,
    SAVE_HISTORY_VIDEO,
    END_WORKOUT,
    TOGGLE_HISTORY_CAMERA_TYPE,
    PRESENT_HISTORY_FILTER,
    PRESENT_HISTORY_FILTER_EXERCISE,
    SAVE_HISTORY_FILTER_EXERCISE,
    DISMISS_HISTORY_FILTER_EXERCISE,
    PRESENT_HISTORY_FILTER_INCLUDES_TAGS,
    DISMISS_HISTORY_FILTER_INCLUDES_TAGS,
    SAVE_HISTORY_FILTER_INCLUDES_TAGS,
    PRESENT_HISTORY_FILTER_EXCLUDES_TAGS,
    DISMISS_HISTORY_FILTER_EXCLUDES_TAGS,
    SAVE_HISTORY_FILTER_EXCLUDES_TAGS,
    PRESENT_HISTORY_FILTER_START_DATE,
    PRESENT_HISTORY_FILTER_END_DATE,
    SAVE_HISTORY_FILTER_START_DATE,
    SAVE_HISTORY_FILTER_END_DATE,
    SAVE_HISTORY_FILTER_START_RPE,
    SAVE_HISTORY_FILTER_END_RPE,
    SAVE_HISTORY_FILTER_STARTING_REP_RANGE,
    SAVE_HISTORY_FILTER_ENDING_REP_RANGE,
    SAVE_HISTORY_FILTER_START_WEIGHT,
    SAVE_HISTORY_FILTER_END_WEIGHT,
    SAVE_HISTORY_FILTER,
    CLEAR_HISTORY_FILTER,
    DISMISS_HISTORY_FILTER,
    TOGGLE_START_WEIGHT_METRIC,
    TOGGLE_END_WEIGHT_METRIC,
    TOGGLE_SHOW_REMOVED,
    CLEAR_HISTORY_FILTER_START_DATE,
    CLEAR_HISTORY_FILTER_END_DATE,
    DISMISS_HISTORY_FILTER_START_DATE,
    DISMISS_HISTORY_FILTER_END_DATE,
} from 'app/configs+constants/ActionTypes';

// isEditing for analytics
const defaultState = {
    isLoadingHistory: true,
    editingExerciseName: '',
    editingExerciseSetID: null,
    editingTags: [],
    editingTagsSetID: null,
    recordingSetID: null,
    recordingVideoType: null,
    cameraType: null,
    isRecording: false,
    isSavingVideo: false,    
    watchSetID: null,
    watchFileURL: null,
    viewedCounter: 0,

    // filter
    exercise: null,
    isEditingFilterExerciseName: false,
    editingFilterExerciseName: '',
    isEditingFilterTagsToInclude: false,
    editingFilterTagsToInclude: [],
    isEditingFilterTagsToExclude: false,
    editingFilterTagsToExclude: [],
    isEditingStartingRPE: false,
    editingStartingRPE: '',
    isEditingEndingRPE: false,
    editingEndingRPE: '',
    isEditingStartingWeight: false,
    editingStartingWeight: '',
    isEditingEndingWeight: false,
    editingEndingWeight: '',
    isEditingStartingRepRange: false,
    editingStartingRepRange: '',
    isEditingEndingRepRange: false,
    editingEndingRepRange: '',
    showStartDatePicker: false,
    isEditingStartingDate: false,
    editingStartingDate: '',
    showEndDatePicker: false,
    isEditingEndingDate: false,
    editingEndingDate: '',
    tagsToInclude: [],
    tagsToExclude: [],
    startingRPE: null,
    endingRPE: null,
    startingWeight: null,
    startingWeightMetric: 'kgs', // TODO: make this based off default setting
    editingStartingWeightMetric: 'kgs',
    endingWeight: null,
    endingWeightMetric: 'kgs',
    editingEndingWeightMetric: 'kgs',
    startingRepRange: null,
    endingRepRange: null,
    startingDate: null,
    endingDate: null,
    editingShowRemoved: false,
    showRemoved: false,
    showHistoryFilter: false,
};

const HistoryReducer = (state = defaultState, action) => {
    switch (action.type) {
        case HISTORY_VIEWED:
            return Object.assign({}, state, {
                viewedCounter: state.viewedCounter + 1,
            });
        case END_WORKOUT:
            return Object.assign({}, state, {
                viewedCounter: 0,
            });
        case LOADING_HISTORY:
            return Object.assign({}, state, {
                isLoadingHistory: action.isLoading
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
        case PRESENT_HISTORY_VIDEO_RECORDER:
            return Object.assign({}, state, {
                recordingSetID: action.setID,
                recordingVideoType: action.isCommentary ? 'commentary' : 'lift',
                cameraType: action.isCommentary ? 'front' : 'back',
                isRecording: false,                
                isSavingVideo: false                
            });
        case TOGGLE_HISTORY_CAMERA_TYPE: {
            let cameraType = state.cameraType;

            return {
                ...state,
                cameraType: cameraType === 'front' ? 'back' : 'front',
            };
        };    
        case SAVE_HISTORY_VIDEO:
        case DISMISS_HISTORY_VIDEO_RECORDER:
            return Object.assign({}, state, {
                recordingSetID: null,
                recordingVideoType: null,
                isRecording: false,
                isSavingVideo: false
            });
        case START_RECORDING_HISTORY:
            return Object.assign({}, state, {
                isRecording: true
            });
        case STOP_RECORDING_HISTORY:
            return Object.assign({}, state, {
                isRecording: false,
                isSavingVideo: true                
            });
        case PRESENT_HISTORY_VIDEO_PLAYER:
            return Object.assign({}, state, {
                watchSetID: action.setID,
                watchFileURL: action.videoFileURL
            });
        case DISMISS_HISTORY_VIDEO_PLAYER:
        case DELETE_HISTORY_VIDEO:        
            return Object.assign({}, state, {
                watchSetID: null,
                watchFileURL: null
            });
        case PRESENT_HISTORY_FILTER:
            return {
                ...state,
                showHistoryFilter: true,
            };
        case DISMISS_HISTORY_FILTER:
            return {
                ...state,
                editingFilterExerciseName: state.exercise,
                editingFilterTagsToInclude: state.tagsToInclude,
                editingFilterTagsToExclude: state.tagsToExclude,
                editingStartingDate: state.startingDate,
                displayStartingDate: state.displayStartingDate, // TODO: this doesn't seem to be used?
                editingEndingDate: state.endingDate,
                displayEndingDate: state.displayEndingDate, // TODO: this doesn't seem to be used?
                editingStartingWeight: state.startingWeight,
                editingStartingWeightMetric: state.startingWeightMetric,
                editingEndingWeight: state.endingWeight,
                editingEndingWeightMetric: state.endingWeightMetric,
                editingStartingRPE: state.startingRPE,
                editingEndingRPE: state.endingRPE,
                editingStartingRepRange: state.startingRepRange,
                editingEndingRepRange: state.endingRepRange,
                editingShowRemoved: state.showRemoved,
                showHistoryFilter: false,
            };
        case PRESENT_HISTORY_FILTER_EXERCISE:
            return {
                ...state,
                isEditingFilterExerciseName: true,
            };    
        case SAVE_HISTORY_FILTER_EXERCISE:
            return {
                ...state,
                editingFilterExerciseName: action.exercise,
            };
        case DISMISS_HISTORY_FILTER_EXERCISE:
            return {
                ...state,
                isEditingFilterExerciseName: false,
            };
        case PRESENT_HISTORY_FILTER_INCLUDES_TAGS:
            return {
                ...state,
                isEditingFilterTagsToInclude: true,
            };
        case SAVE_HISTORY_FILTER_INCLUDES_TAGS:
            return {
                ...state,
                editingFilterTagsToInclude: action.tags,
            };
        case DISMISS_HISTORY_FILTER_INCLUDES_TAGS:
            return {
                ...state,
                isEditingFilterTagsToInclude: false,
            };
        case PRESENT_HISTORY_FILTER_EXCLUDES_TAGS:
            return {
                ...state,
                isEditingFilterTagsToExclude: true,
            };
        case SAVE_HISTORY_FILTER_EXCLUDES_TAGS:
            return {
                ...state,
                editingFilterTagsToExclude: action.tags,
            };
        case DISMISS_HISTORY_FILTER_EXCLUDES_TAGS:
            return {
                ...state,
                isEditingFilterTagsToExclude: false,
            };
        case PRESENT_HISTORY_FILTER_START_DATE:
            return {
                ...state,
                isEditingStartingDate: true,
            };
        case SAVE_HISTORY_FILTER_START_DATE:
            return {
                ...state,
                editingStartingDate: action.date,
                displayStartingDate: action.displayDate,
                isEditingStartingDate: false,
            };
        case PRESENT_HISTORY_FILTER_END_DATE:
            return {
                ...state,
                isEditingEndingDate: true,
            };
        case SAVE_HISTORY_FILTER_END_DATE:
            return {
                ...state,
                editingEndingDate: action.date,
                displayEndingDate: action.displayDate,
                isEditingEndingDate: false,
            };
        case SAVE_HISTORY_FILTER_START_RPE:
            return {
                ...state,
                editingStartingRPE: action.rpe,
            };
        case SAVE_HISTORY_FILTER_END_RPE:
            return {
                ...state,
                editingEndingRPE: action.rpe,
            };
        case SAVE_HISTORY_FILTER_STARTING_REP_RANGE:
            return {
                ...state,
                editingStartingRepRange: action.startingRepRange,
            };
        case SAVE_HISTORY_FILTER_ENDING_REP_RANGE:
            return {
                ...state,
                editingEndingRepRange: action.endingRepRange,
            };
        case SAVE_HISTORY_FILTER_START_WEIGHT:
            return {
                ...state,
                editingStartingWeight: action.startWeight,
            };
        case SAVE_HISTORY_FILTER_END_WEIGHT:
            return {
                ...state,
                editingEndingWeight: action.endWeight,
            };
        case CLEAR_HISTORY_FILTER:
            return {
                ...state,
                editingFilterExerciseName: '',
                editingFilterTagsToInclude: [],
                editingFilterTagsToExclude: [],
                editingStartingDate: null,
                editingEndingDate: null,
                editingStartingWeight: '',
                editingStartingWeightMetric: 'kgs', // TODO: set this to default kg/lb
                editingEndingWeight: '',
                editingEndingWeightMetric: 'kgs',
                editingStartingRPE: '',
                editingEndingRPE: '',
                editingStartingRepRange: '',
                editingEndingRepRange: '',
                editingShowRemoved: false,
            };  
        case SAVE_HISTORY_FILTER: {
            const exercise = state.editingFilterExerciseName;
            const tagsToInclude = state.editingFilterTagsToInclude;
            const tagsToExclude = state.editingFilterTagsToExclude;
            const startingDate = state.editingStartingDate;
            const displayStartingDate = state.displayStartingDate;
            const endingDate = state.editingEndingDate;
            const displayEndingDate = state.displayEndingDate;
            const startingWeight = state.editingStartingWeight;
            const startingWeightMetric = state.editingStartingWeightMetric;
            const endingWeight = state.editingEndingWeight;
            const endingWeightMetric = state.editingEndingWeightMetric;
            const startingRPE = state.editingStartingRPE;
            const endingRPE = state.editingEndingRPE;
            const startingRepRange = state.editingStartingRepRange;
            const endingRepRange = state.editingEndingRepRange;
            const showRemoved = state.editingShowRemoved;

            return {
                ...state,
                exercise,
                tagsToInclude,
                tagsToExclude,
                startingDate,
                endingDate,
                startingWeight,
                startingWeightMetric,
                endingWeight,
                endingWeightMetric,
                startingRPE,
                endingRPE,
                startingRepRange,
                endingRepRange,
                showRemoved,
                showHistoryFilter: false,
            };
        }
        case TOGGLE_START_WEIGHT_METRIC: {
            const startingWeightMetric = state.editingStartingWeightMetric;
            const newStartingWeightMetric = startingWeightMetric === 'kgs' ? 'lbs' : 'kgs';

            return {
                ...state,
                editingStartingWeightMetric: newStartingWeightMetric
            };
        }
        case TOGGLE_END_WEIGHT_METRIC: {
            const endingWeightMetric = state.editingEndingWeightMetric;
            const newEndingWeightMetric = endingWeightMetric === 'kgs' ? 'lbs' : 'kgs';

            return {
                ...state,
                editingEndingWeightMetric: newEndingWeightMetric
            };
        }
        case TOGGLE_SHOW_REMOVED:
            return {
                ...state,
                editingShowRemoved: !state.editingShowRemoved
            };
        case CLEAR_HISTORY_FILTER_START_DATE:
            return {
                ...state,
                editingStartingDate: null,
                displayStartingDate: '',
            };
        case CLEAR_HISTORY_FILTER_END_DATE:
            return {
                ...state,
                editingEndingDate: null,
                displayEndingDate: '',
            };
        case DISMISS_HISTORY_FILTER_START_DATE:
            return {
                ...state,
                isEditingStartingDate: false,
            };
        case DISMISS_HISTORY_FILTER_END_DATE:
            return {
                ...state,
                isEditingEndingDate: false,
            };
        default:
            return state;
    }
};

export default HistoryReducer;
