import {
    PRESENT_WORKOUT_EXERCISE,
    PRESENT_WORKOUT_TAGS,
    PRESENT_WORKOUT_EXPANDED,
    START_EDITING_WORKOUT_RPE,
    START_EDITING_WORKOUT_WEIGHT,
    DISMISS_WORKOUT_EXERCISE,
    DISMISS_WORKOUT_TAGS,
    DISMISS_WORKOUT_EXPANDED,
    END_EDITING_WORKOUT_RPE,
    END_EDITING_WORKOUT_WEIGHT,
    PRESENT_WORKOUT_VIDEO_RECORDER,
    DISMISS_WORKOUT_VIDEO_RECORDER,
    START_RECORDING_WORKOUT,
    STOP_RECORDING_WORKOUT,
    PRESENT_WORKOUT_VIDEO_PLAYER,
    DISMISS_WORKOUT_VIDEO_PLAYER,
    DELETE_WORKOUT_VIDEO,
    SAVE_WORKOUT_VIDEO,
    START_END_SET_TIMER,
    STOP_END_SET_TIMER,
    PAUSE_END_SET_TIMER,
    RESUME_END_SET_TIMER
} from 'app/ActionTypes';

const defaultState = {
    // editing
    isEditing: false,
    editingExerciseSetID: null,
    editingExerciseName: '',
    editingExerciseBias: null,
    editingTagsSetID: null,
    editingTags: [],

    // expanded
    expandedSetID: null,

    // video
    recordingSetID: null,
    recordingVideoType: null,
    isRecording: false,
    isSavingVideo: false,
    watchSetID: null,
    watchFileURL: null,

    // timer
    projectedEndSetTime: null,
    timerRemaining: null,
    timerDuration: null,
    timerStatus: 'inactive'
};

const WorkoutReducer = (state = defaultState, action) => {
    switch (action.type) {
        case PRESENT_WORKOUT_EXERCISE:
            return Object.assign({}, state, {
                editingExerciseSetID: action.setID,
                editingExerciseName: action.exercise,
                editingExerciseBias: action.bias,
                isEditing: true
            });
        case DISMISS_WORKOUT_EXERCISE:
            return Object.assign({}, state, {
                editingExerciseSetID: null,
                editingExerciseName: '',
                isEditing: false
            });
        case PRESENT_WORKOUT_TAGS:
            return Object.assign({}, state, {
                editingTagsSetID: action.setID,
                editingTags: action.tags,
                isEditing: true
            });
        case DISMISS_WORKOUT_TAGS:
            return Object.assign({}, state, {
                editingTagsSetID: null,
                editingTags: [],
                isEditing: false
            });
        case PRESENT_WORKOUT_EXPANDED:
            return Object.assign({}, state, {
                expandedSetID: action.setID,
                isEditing: true
            });
        case DISMISS_WORKOUT_EXPANDED:
            return Object.assign({}, state, {
                expandedSetID: null,
                isEditing: false
            });
        case PRESENT_WORKOUT_VIDEO_RECORDER:
            return Object.assign({}, state, {
                recordingSetID: action.setID,
                recordingVideoType: action.isCommentary ? 'commentary' : 'lift',
                isRecording: false,
                isSavingVideo: false,
                isEditing: true             
            });
        case SAVE_WORKOUT_VIDEO:
        case DISMISS_WORKOUT_VIDEO_RECORDER:
            return Object.assign({}, state, {
                recordingSetID: null,
                recordingVideoType: null,
                isRecording: false,
                isSavingVideo: false,
                isEditing: false                
            });
        case START_RECORDING_WORKOUT:
            return Object.assign({}, state, {
                isRecording: true,
                isEditing: true
            });
        case STOP_RECORDING_WORKOUT:
            return Object.assign({}, state, {
                isRecording: false,
                isSavingVideo: true,
                isEditing: false
            });
        case PRESENT_WORKOUT_VIDEO_PLAYER:
            return Object.assign({}, state, {
                watchSetID: action.setID,
                watchFileURL: action.videoFileURL,
                isEditing: true
            });
        case DELETE_WORKOUT_VIDEO:            
        case DISMISS_WORKOUT_VIDEO_PLAYER:
            return Object.assign({}, state, {
                watchSetID: null,
                watchFileURL: null,
                isEditing: false
            });
        case START_EDITING_WORKOUT_RPE:
            return Object.assign({}, state, {
                isEditing: true,
            });
        case END_EDITING_WORKOUT_RPE:
            return Object.assign({}, state, {
                isEditing: isModalVisible(state),
            });
        case START_EDITING_WORKOUT_WEIGHT:
            return Object.assign({}, state, {
                isEditing: true,
            });
        case END_EDITING_WORKOUT_WEIGHT:
            return Object.assign({}, state, {
                isEditing: isModalVisible(state),
            });
        case START_END_SET_TIMER:
            return Object.assign({}, state, {
                projectedEndSetTime: action.projectedEndSetTime,
                timerDuration: action.timerDuration,
                timerRemaining: action.timerRemaining,
                timerStatus: 'running'
            });
        case RESUME_END_SET_TIMER:
            return Object.assign({}, state, {
                projectedEndSetTime: action.projectedEndSetTime,
                timerRemaining: action.timerRemaining,
                timerStatus: 'running'
            });
        case STOP_END_SET_TIMER:
            return Object.assign({}, state, {
                projectedEndSetTime: null,
                timerDuration: null,
                timerRemaining: null,
                timerStatus: 'inactive'
            });
        case PAUSE_END_SET_TIMER:        
            return Object.assign({}, state, {
                projectedEndSetTime: null,
                timerRemaining: action.timerRemaining,
                timerStatus: 'paused'
            });
        default:
            return state;
    }
};

const isModalVisible = (state) => {
    return (state.editingExerciseSetID !== null || state.editingTagsSetID !== null || state.expandedSetID !== null || state.recordingSetID !== null || state.watchSetID !== null);
};

export default WorkoutReducer;
