import {
    END_SET,
    END_WORKOUT,
    SHOW_COLLAPSED_VIEW,
    CLOSE_COLLAPSED_VIEW
} from 'app/ActionTypes';

const CollapsedModelReducer = (state = {}, action) => {
    switch(action.type) {
        case END_SET:
            return action.sets;
        case END_WORKOUT:
            return {};
        case SHOW_COLLAPSED_VIEW:
            return Object.assign({}, state, {
                [action.setID]: true
            });
        case CLOSE_COLLAPSED_VIEW:
            return Object.assign({}, state, {
                [action.setID]: false
            });            
        default:
            return state;
    }
}

export default CollapsedModelReducer;
