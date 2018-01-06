import {
    DISMISS_SURVEY,
    COMPLETE_SURVEY,
} from 'app/ActionTypes';

export const closeSurvey = () => (dispatch, getState) => {
    // TODO: Alert confirm first

    // TODO: analytics
    dispatch({
        type: COMPLETE_SURVEY,
    });
};

export const fillOutLater = () => (dispatch, getState) => {
    // TODO: analytics
    dispatch({
        type: DISMISS_SURVEY,
    });
};
