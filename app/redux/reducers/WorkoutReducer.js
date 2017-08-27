import {
    PRESENT_WORKOUT_EXERCISE,
    PRESENT_WORKOUT_TAGS,
    PRESENT_WORKOUT_EXPANDED,
    DISMISS_WORKOUT_EXERCISE,
    DISMISS_WORKOUT_TAGS,
    DISMISS_WORKOUT_EXPANDED,
    PRESENT_WORKOUT_VIDEO_RECORDER,
    DISMISS_WORKOUT_VIDEO_RECORDER,
    START_RECORDING_WORKOUT,
    STOP_RECORDING_WORKOUT,
    PRESENT_WORKOUT_VIDEO_PLAYER,
    DISMISS_WORKOUT_VIDEO_PLAYER,
    DELETE_WORKOUT_VIDEO,
    SAVE_WORKOUT_VIDEO
} from 'app/ActionTypes';

const defaultState = {
    editingExerciseSetID: null,
    editingExerciseName: '',
    editingExerciseBias: null,
    editingTagsSetID: null,
    editingTags: [],
    expandedSetID: null,
    recordingSetID: null,
    recordingVideoType: null,
    isRecording: false,
    watchSetID: null,
    watchFileURL: null
};

const WorkoutReducer = (state = defaultState, action) => {
    switch (action.type) {
        case PRESENT_WORKOUT_EXERCISE:
            return Object.assign({}, state, {
                editingExerciseSetID: action.setID,
                editingExerciseName: action.exercise,
                editingExerciseBias: action.bias
            });
        case DISMISS_WORKOUT_EXERCISE:
            return Object.assign({}, state, {
                editingExerciseSetID: null,
                editingExerciseName: ''
            });
        case PRESENT_WORKOUT_TAGS:
            return Object.assign({}, state, {
                editingTagsSetID: action.setID,
                editingTags: action.tags
            });
        case DISMISS_WORKOUT_TAGS:
            return Object.assign({}, state, {
                editingTagsSetID: null,
                editingTags: []
            });
        case PRESENT_WORKOUT_EXPANDED:
            return Object.assign({}, state, {
                expandedSetID: action.setID,
            });
        case DISMISS_WORKOUT_EXPANDED:
            return Object.assign({}, state, {
                expandedSetID: null,
            });
        case PRESENT_WORKOUT_VIDEO_RECORDER:
            return Object.assign({}, state, {
                recordingSetID: action.setID,
                recordingVideoType: action.isCommentary ? 'commentary' : 'lift',
                isRecording: false
            });
        case SAVE_WORKOUT_VIDEO:
        case DISMISS_WORKOUT_VIDEO_RECORDER:
            return Object.assign({}, state, {
                recordingSetID: null,
                recordingVideoType: null,
                isRecording: false
            });
        case START_RECORDING_WORKOUT:
            return Object.assign({}, state, {
                isRecording: true
            });
        case STOP_RECORDING_WORKOUT:
            return Object.assign({}, state, {
                isRecording: false
            });
        case PRESENT_WORKOUT_VIDEO_PLAYER:
            return Object.assign({}, state, {
                watchSetID: action.setID,
                watchFileURL: action.videoFileURL
            });
        case DELETE_WORKOUT_VIDEO:            
        case DISMISS_WORKOUT_VIDEO_PLAYER:
            return Object.assign({}, state, {
                watchSetID: null,
                watchFileURL: null
            });
        default:
            return state;
    }
};

export default WorkoutReducer;
