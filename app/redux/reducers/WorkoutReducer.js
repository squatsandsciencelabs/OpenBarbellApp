import {
    PRESENT_WORKOUT_EXERCISE,
    PRESENT_WORKOUT_TAGS,
    PRESENT_WORKOUT_EXPANDED,
    DISMISS_WORKOUT_EXERCISE,
    DISMISS_WORKOUT_TAGS,
    DISMISS_WORKOUT_EXPANDED,
    PRESENT_WORKOUT_RECORD_VIDEO,
    DISMISS_WORKOUT_RECORD_VIDEO,
    START_RECORDING_WORKOUT,
    STOP_RECORDING_WORKOUT
} from 'app/ActionTypes';

const defaultState = {
    editingExerciseSetID: null,
    editingExerciseName: '',
    editingExerciseBias: null,
    editingTagsSetID: null,
    editingTags: [],
    expandedSetID: null,
    videoSetID: null,
    isRecording: false
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
        case PRESENT_WORKOUT_RECORD_VIDEO:
            return Object.assign({}, state, {
                videoSetID: action.setID,
            });
        case DISMISS_WORKOUT_RECORD_VIDEO:
            return Object.assign({}, state, {
                videoSetID: null,
            });
        case START_RECORDING_WORKOUT:
            return Object.assign({}, state, {
                isRecording: true
            });
        case STOP_RECORDING_WORKOUT:
            return Object.assign({}, state, {
                isRecording: false,
            });
        default:
            return state;
    }
};

export default WorkoutReducer;
