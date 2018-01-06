import {
    SAVE_SURVEY_URL,
    PRESENT_SURVEY,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';

// note: analytics are done in surveysaga instead
export const saveSurveyURL = (url) => ({
    type: SAVE_SURVEY_URL,
    surveyURL: url,
});

export const presentSurvey = () => {
    Analytics.setCurrentScreen('survey');

    return {
        type: PRESENT_SURVEY
    };
};
