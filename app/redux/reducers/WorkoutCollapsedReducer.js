import {
    EXPAND_WORKOUT_SET,
    COLLAPSE_WORKOUT_SET
} from 'app/ActionTypes';

const defaultState = {
};

const WorkoutCollapsedReducer = (state = defaultState, action) => {
    switch (action.type) {
        case EXPAND_WORKOUT_SET:
            let changes = {};
            changes[action.setID] = true;
            return Object.assign({}, state, changes);
        case COLLAPSE_WORKOUT_SET:
            let changes = {};
            changes[action.setID] = false;
            return Object.assign({}, state, changes);
        default:
            return state;
    }
};

export default WorkoutCollapsedReducer;
