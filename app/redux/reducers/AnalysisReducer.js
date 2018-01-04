import {
    CHANGE_SLIDER_VELOCITY,
    CHANGE_SLIDER_DAYS,
    PRESENT_SELECT_EXERCISE,
    SAVE_SELECTED_EXERCISE,
    DISMISS_SELECT_EXERCISE,
} from 'app/ActionTypes';

const defaultState = {
    isEditingExercise: false,
    velocity: .01,
    exercise: 'Bench',
    days: 7
}

const AnalysisReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_SLIDER_VELOCITY:
            return Object.assign({}, state, {
                velocity: Number(action.velocity.toFixed(2))
            });
        case CHANGE_SLIDER_DAYS: 
            return Object.assign({}, state, {
                days: action.days
            });
        case PRESENT_SELECT_EXERCISE: 
            return Object.assign({}, state, {
                isEditingExercise: true
            });
        case DISMISS_SELECT_EXERCISE:
            return Object.assign({}, state, {
                isEditingExercise: false
            })
        case SAVE_SELECTED_EXERCISE:
            return Object.assign({}, state, {
                exercise: action.exercise
            });
        
        default: 
            return state;
    }
};

export default AnalysisReducer;
