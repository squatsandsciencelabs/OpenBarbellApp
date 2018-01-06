import {
    PRESENT_SURVEY,
} from 'app/ActionTypes';

export const presentSurvey = () => (dispatch, getState) => {
    // TODO: analytics
    dispatch({
        type: PRESENT_SURVEY,
    });
};
