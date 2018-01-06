import {
    SAVE_SURVEY_URL,
    PRESENT_SURVEY,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const saveSurveyURL = (url) => (dispatch, getState) => {
    // TODO: analytics
    dispatch({
        type: SAVE_SURVEY_URL,
        surveyURL: url,
    });
};

export const presentSurvey = () => {
    Analytics.setCurrentScreen('survey');

    return {
        type: PRESENT_SURVEY
    };
};
