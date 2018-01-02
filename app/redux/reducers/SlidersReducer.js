import {
    CHANGE_SLIDER_VELOCITY,
    CHANGE_SLIDER_DAYS
} from 'app/ActionTypes';

const defaultState = {
    velocity: .01,
    exercise: 'Bench',
    days: 7
}

const SlidersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_SLIDER_VELOCITY:
            return Object.assign({}, state, {
                velocity: Number(action.velocity.toFixed(2))
            });
        case CHANGE_SLIDER_DAYS: 
            return Object.assign({}, state, {
                days: action.days
            })
        default: 
            return state;
    }
};

export default SlidersReducer;
