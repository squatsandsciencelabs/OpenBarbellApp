import {
    END_WORKOUT,
    EXPAND_WORKOUT_SET,
    COLLAPSE_WORKOUT_SET,
    DELETE_WORKOUT_SET,
} from 'app/configs+constants/ActionTypes';

const defaultState = {
};

const WorkoutCollapsedReducer = (state = defaultState, action) => {
    let changes = null;

    switch (action.type) {
        case END_WORKOUT:
            return defaultState;
        case EXPAND_WORKOUT_SET:
            changes = {};
            changes[action.setID] = false;
            return Object.assign({}, state, changes);
        case DELETE_WORKOUT_SET:
        case COLLAPSE_WORKOUT_SET:
            changes = {};
            changes[action.setID] = true;
            return Object.assign({}, state, changes);
        default:
            return state;
    }
};

export default WorkoutCollapsedReducer;
