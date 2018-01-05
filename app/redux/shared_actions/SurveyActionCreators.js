import {
    PRESENT_SURVEY,
    DISMISS_SURVEY,
    COMPLETE_SURVEY,
    SAVE_SURVEY_URL,
} from 'app/ActionTypes';

export const saveSurveyURL = (url) => ({
    type: SAVE_SURVEY_URL,
    surveyURL: url,
});
