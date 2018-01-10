import {
    CHANGE_1RM_VELOCITY,
    CHANGE_1RM_DAYS_RANGE,
    PRESENT_SELECT_EXERCISE,
    SAVE_1RM_EXERCISE,
    DISMISS_SELECT_EXERCISE,
} from 'app/ActionTypes';

const defaultState = {
    isEditing1RMExercise: false,
    e1RMVelocity: .01,
    e1RMExercise: 'Bench',
    e1RMDaysRange: 7,
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
        
        default: 
            return state;
    }
};

export default AnalysisReducer;
