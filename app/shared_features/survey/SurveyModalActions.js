import {
    DISMISS_SURVEY,
    COMPLETE_SURVEY,
    SAVE_SURVEY_URL,
} from 'app/ActionTypes';

export const saveSurveyURL = (url) => (dispatch, getState) => {
    // TODO: analytics
    dispatch({
        type: SAVE_SURVEY_URL,
        surveyURL: url,
    });
};

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
