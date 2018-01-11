import {
    CHANGE_1RM_VELOCITY,
    CHANGE_1RM_DAYS_RANGE,
    PRESENT_SELECT_EXERCISE,
    SAVE_1RM_EXERCISE,
    DISMISS_SELECT_EXERCISE,
    ADD_INCLUDE_TAG,
    ADD_EXCLUDE_TAG,
    REMOVE_INCLUDE_TAG,
    REMOVE_EXCLUDE_TAG,
} from 'app/ActionTypes';

const defaultState = {
    isEditing1RMExercise: false,
    e1RMVelocity: .01,
    e1RMExercise: 'Bench',
    e1RMDaysRange: 7,
    tagsToInclude: [],
    tagsToExclude: [],
};

const AnalysisReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_1RM_VELOCITY:
            return Object.assign({}, state, {
                e1RMVelocity: Number(action.velocity.toFixed(2))
            });
        case CHANGE_1RM_DAYS_RANGE: 
            return Object.assign({}, state, {
                e1RMDaysRange: action.days
            });
        case PRESENT_SELECT_EXERCISE: 
            return Object.assign({}, state, {
                isEditing1RMExercise: true
            });
        case DISMISS_SELECT_EXERCISE:
            return Object.assign({}, state, {
                isEditing1RMExercise: false
            })
        case SAVE_1RM_EXERCISE:
            return Object.assign({}, state, {
                e1RMExercise: action.exercise
            });
        case ADD_INCLUDE_TAG:
            return { 
                ...state,
                tagsToInclude: [...state.tagsToInclude, action.tag]
            }
        case ADD_EXCLUDE_TAG:
            return { 
                ...state,
                tagsToExclude: [...state.tagsToExclude, action.tag]
            }    
        case REMOVE_INCLUDE_TAG:
            return {
                ...state,
                tagsToInclude: state.tagsToInclude.filter(tag => tag !== action.tag),
            }
        case REMOVE_EXCLUDE_TAG:
            return {
                ...state,
                tagsToExclude: state.tagsToExclude.filter(tag => tag !== action.tag),
            }
        default: 
            return state;
    }
};

export default AnalysisReducer;
