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
    logCloseSurveyAnalytics(state);

    // present
    Alert.alert(
        "Thanks for taking our survey!",
        null,
        [
            {
                text: "Finished",
                onPress: () => {
                    dispatch(finish());
                },
            },
            {
                text: 'Later',
                onPress: () => {
                    dispatch(later());
                },
            },
            {
                text: 'I Hate Data',
                onPress: () => {
                    dispatch(optout());
                },
            },
        ]
    );
};

export const optout = () => (dispatch, getState) => {
    // analytics
    const state = getState();
    logOptOutSurveyAnalytics(state);
    resetScreen(state);

    dispatch({
        type: COMPLETE_SURVEY,
    });
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

export const later = () => (dispatch, getState) => {
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

const logCloseSurveyAnalytics = (state) => {
    Analytics.logEventWithAppState('close_survey', {
        url: SurveySelectors.getURL(state),
    }, state);
};

const logFinishSurveyAnalytics = (state) => {
    Analytics.logEventWithAppState('finish_survey', {
        url: SurveySelectors.getURL(state),
    }, state);
};

const logOptOutSurveyAnalytics = (state) => {
    Analytics.logEventWithAppState('opt_out_survey', {
        url: SurveySelectors.getURL(state),
    }, state);
};

const logFillSurveyLaterAnalytics = (state) => {
    Analytics.logEventWithAppState('fill_survey_later', {
        url: SurveySelectors.getURL(state),
    }, state);
};
