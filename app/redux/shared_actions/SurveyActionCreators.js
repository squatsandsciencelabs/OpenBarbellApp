import {
    SAVE_SURVEY_URL,
    PRESENT_SURVEY,
} from 'app/ActionTypes';

export const saveSurveyURL = (url) => (dispatch, getState) => {
    // TODO: analytics
    dispatch({
        type: SAVE_SURVEY_URL,
        surveyURL: url,
    });
};

export const presentSurvey = () => ({
    type: PRESENT_SURVEY
});
