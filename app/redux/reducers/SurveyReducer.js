import {
    PRESENT_SURVEY,
    DISMISS_SURVEY,
    COMPLETE_SURVEY,
    SAVE_SURVEY_URL,
    OPT_OUT_END_WORKOUT_SURVEY_PROMPT,
} from 'app/configs+constants/ActionTypes';

const defaultState = {
    surveyURL: '',
    completedSurveyURLs: [], // this is to determine if there's a survey to be shown
    optedOutEndWorkoutPromptSurveyURLs: [], // this is to determine if someone no longer wants to see the prompts on end workout
    isFillingOutSurvey: false,
};

const SurveyReducer = (state = defaultState, action) => {
    switch (action.type) {
        case PRESENT_SURVEY:
            return Object.assign({}, state, {
                isFillingOutSurvey: true,
            });
        case DISMISS_SURVEY:
            return Object.assign({}, state, {
                isFillingOutSurvey: false,
            });
        case COMPLETE_SURVEY:
            if (state.surveyURL) {
                return Object.assign({}, state, {
                    completedSurveyURLs: [...state.completedSurveyURLs, state.surveyURL],
                    isFillingOutSurvey: false,
                });
            }
        case SAVE_SURVEY_URL:
            return Object.assign({}, state, {
                surveyURL: action.surveyURL,
            });
        case OPT_OUT_END_WORKOUT_SURVEY_PROMPT:
            return {
                ...state,
                optedOutEndWorkoutPromptSurveyURLs: [...state.optedOutEndWorkoutPromptSurveyURLs, state.surveyURL],
            };
        default:
            return state;
    }
};

export default SurveyReducer;
