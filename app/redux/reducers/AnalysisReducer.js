import {
    CHANGE_VELOCITY_SLIDER,
    CHANGE_1RM_DAYS_RANGE,
    PRESENT_SELECT_EXERCISE,
    SAVE_1RM_EXERCISE,
    DISMISS_SELECT_EXERCISE,
    PRESENT_INCLUDES_TAGS,
    PRESENT_EXCLUDES_TAGS,
    ADD_INCLUDE_TAG,
    ADD_EXCLUDE_TAG,
    SAVE_INCLUDES_TAGS,
    SAVE_EXCLUDES_TAGS,
    DISMISS_INCLUDES_TAGS,
    DISMISS_EXCLUDES_TAGS,
    CALC_ONE_RM,
} from 'app/ActionTypes';

const defaultState = {
    isEditing1RMExercise: false,
    isEditingIncludeTags: false,
    isEditingExcludeTags: false,
    velocitySlider: .01,
    e1RMExercise: 'Bench',
    e1RMDaysRange: 7,
    tagsToInclude: [],
    tagsToExclude: [],
    e1rm: null,
    e1RMVelocity: null,
    confidence: null,
};

const AnalysisReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_VELOCITY_SLIDER:
            return {
                ...state,
                velocitySlider: Number(action.velocity.toFixed(2)),
            };
        case CHANGE_1RM_DAYS_RANGE: 
            return Object.assign({}, state, {
                e1RMDaysRange: action.days,
            });
        case PRESENT_SELECT_EXERCISE: 
            return Object.assign({}, state, {
                isEditing1RMExercise: true,
            });
        case DISMISS_SELECT_EXERCISE:
            return Object.assign({}, state, {
                isEditing1RMExercise: false,
            });
        case SAVE_1RM_EXERCISE:
            return Object.assign({}, state, {
                e1RMExercise: action.exercise,
            });
        case PRESENT_INCLUDES_TAGS:
            return {
                ...state,
                isEditingIncludeTags: true,
            };
        case SAVE_INCLUDES_TAGS:
            return {
                ...state,
                tagsToInclude: action.tags,
            };
        case DISMISS_INCLUDES_TAGS:
            return {
                ...state,
                isEditingIncludeTags: false,
            };
        case PRESENT_EXCLUDES_TAGS:
            return {
                ...state,
                isEditingExcludeTags: true,
            };
        case SAVE_EXCLUDES_TAGS:
            return {
                ...state,
                tagsToExclude: action.tags,
            };
        case DISMISS_EXCLUDES_TAGS:
            return {
                ...state,
                isEditingExcludeTags: false,
            };
        case CALC_ONE_RM:
            return {
                ...state,
                e1rm: action.e1rm,
                e1RMVelocity: action.e1RMVelocity,
                confidence: action.confidence,
            };
        default: 
            return state;
    }
};

export default AnalysisReducer;
