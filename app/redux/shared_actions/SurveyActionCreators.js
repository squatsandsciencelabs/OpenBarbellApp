import {
    SAVE_SURVEY_URL,
} from 'app/ActionTypes';

export const saveSurveyURL = (url) => (dispatch, getState) => {
    // TODO: analytics
    dispatch({
        type: SAVE_SURVEY_URL,
        surveyURL: url,
    });
};
