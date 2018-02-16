import {
    SAVE_SURVEY_URL,
    PRESENT_SURVEY,
    COMPLETE_SURVEY,
    OPT_OUT_END_WORKOUT_SURVEY_PROMPT,
} from 'app/configs+constants/ActionTypes';
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

export const completeSurvey = () => ({
    type: COMPLETE_SURVEY,
});

export const optOutEndWorkoutSurveyPrompt = () => ({
    type: OPT_OUT_END_WORKOUT_SURVEY_PROMPT,
});
