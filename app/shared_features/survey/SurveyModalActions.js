import { Alert } from 'react-native';

import {
    DISMISS_SURVEY,
    COMPLETE_SURVEY,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SurveySelectors from 'app/redux/selectors/SurveySelectors';
import * as AppStateSelectors from 'app/redux/selectors/AppStateSelectors';

export const closeSurvey = () => (dispatch, getState) => {
    // log analytics
    const state = getState();
    logAttemptFinishSurveyAnalytics(state);

    // present
    Alert.alert(
        null,
        "Are you done with the survey? We won't show this one to you again.",
        [
            {
                text: 'Cancel',
                onPress: () => {
                    dispatch(cancel());
                },
                style: 'cancel'
            },
            {
                text: "Finished",
                onPress: () => {
                    dispatch(finish());
                },
            },
        ]
    );
};

export const cancel = () => (dispatch, getState) => {
    const state = getState();
    logCancelFinishSurveyAnalytics(state);
    resetScreen(state);
};

export const finish = () => (dispatch, getState) => {
    // analytics
    const state = getState();
    logFinishSurveyAnalytics(state);
    resetScreen(state);

    dispatch({
        type: COMPLETE_SURVEY,
    });
};

export const fillOutLater = () => (dispatch, getState) => {
    // analytics
    const state = getState();
    logFillSurveyLaterAnalytics(state);
    resetScreen(state);

    dispatch({
        type: DISMISS_SURVEY,
    });
};

// TODO: make sure to handle new tabs here as well
const resetScreen = (state) => {
    const tabIndex = AppStateSelectors.getTabIndex(state);

    switch(tabIndex) {
        case 0:
            Analytics.setCurrentScreen('workout');
            break;
        case 1:
            Analytics.setCurrentScreen('history');
            break;
        case 2: 
            Analytics.setCurrentScreen('settings');
            break;
        default:
            break;
    }
};

// ANALYTICS

const logAttemptFinishSurveyAnalytics = (state) => {
    Analytics.logEventWithAppState('attempt_finish_survey', {
        url: SurveySelectors.getURL(state),
    }, state);
};

const logFinishSurveyAnalytics = (state) => {
    Analytics.logEventWithAppState('finish_survey', {
        url: SurveySelectors.getURL(state),
    }, state);
};

const logCancelFinishSurveyAnalytics = (state) => {
    Analytics.logEventWithAppState('cancel_finish_survey', {
        url: SurveySelectors.getURL(state),
    }, state);
};

const logFillSurveyLaterAnalytics = (state) => {
    Analytics.logEventWithAppState('fill_survey_later', {
        url: SurveySelectors.getURL(state),
    }, state);
};
