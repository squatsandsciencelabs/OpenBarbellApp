import {
    PRESENT_WORKOUT_EXERCISE,
    PRESENT_WORKOUT_TAGS,
    PRESENT_WORKOUT_EXPANDED,
    DISMISS_WORKOUT_EXERCISE,
    DISMISS_WORKOUT_TAGS,
    DISMISS_WORKOUT_EXPANDED
} from 'app/ActionTypes';

const defaultState = {
    editingExerciseSetID: null,
    editingExerciseName: '',
    editingTagsSetID: null,
    editingTags: [],
    expandedSetID: null,
};

const WorkoutReducer = (state = defaultState, action) => {
    switch (action.type) {
        case PRESENT_WORKOUT_EXERCISE:
            return Object.assign({}, state, {
                editingExerciseSetID: action.setID,
                editingExerciseName: action.exercise
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
        default:
            return state;
    }
};

export default WorkoutReducer;
