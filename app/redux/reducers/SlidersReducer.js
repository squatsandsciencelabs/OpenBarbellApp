import {
    CHANGE_SLIDER_VELOCITY
} from 'app/ActionTypes';

const defaultState = {
    velocity: .01,
    exercise: 'Bench'
}

const SlidersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_SLIDER_VELOCITY:
            return Object.assign({}, state, {
                velocity: Number(action.velocity.toFixed(2))
            });
        default: 
            return state;
    }
};

export default SlidersReducer;
