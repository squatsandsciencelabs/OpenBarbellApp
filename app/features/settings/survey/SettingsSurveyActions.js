import {
    PRESENT_SURVEY,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SurveyActionCreators from 'app/redux/shared_actions/SurveyActionCreators';
import * as SurveySelectors from 'app/redux/selectors/SurveySelectors';

export const presentSurvey = () => (dispatch, getState) => {
    // analytics
    const state = getState();
    logPresentSurveyAnalytics(state);

    // TODO: analytics
    dispatch(SurveyActionCreators.presentSurvey());
};

// ANALYTICS

const logPresentSurveyAnalytics = (state) => {
    Analytics.logEventWithAppState('present_survey', {
        url: SurveySelectors.getURL(state),
    }, state);
};
