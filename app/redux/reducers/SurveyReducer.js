import {
    PRESENT_SURVEY,
    DISMISS_SURVEY,
    COMPLETE_SURVEY,
    SAVE_SURVEY_URL,
} from 'app/ActionTypes';

const defaultState = {
    surveyURL: '',
    completedSurveyURLs: [],
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
        default:
            return state;
    }
};

export default SurveyReducer;
