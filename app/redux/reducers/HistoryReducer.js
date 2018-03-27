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
} from 'app/configs+constants/ActionTypes';

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
    tagsToInclude: [],
    tagsToExclude: [],
    startingRPE: null,
    endingRPE: null,
    startingWeight: null,
    endingWeight: null,
    startingRepRange: null,
    endingRepRange: null,
    startingDate: null,
    endingDate: null,
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
        default:
            return state;
    }
};

export default HistoryReducer;
