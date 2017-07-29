import {
    DISMISS_WORKOUT_TAGS,
    SAVE_WORKOUT_SET_TAGS
} from 'app/ActionTypes';
import * as ApiActionCreators from 'app/redux/shared_actions/ApiActionCreators';

export const dismissTags = () => ({
    type: DISMISS_WORKOUT_TAGS
});

export const saveTags = (setID, tags = []) => (dispatch) => {
    dispatch({
        type: SAVE_WORKOUT_SET_TAGS,
        setID: setID,
        tags: tags
    });
    dispatch(ApiActionCreators.syncData());
};
