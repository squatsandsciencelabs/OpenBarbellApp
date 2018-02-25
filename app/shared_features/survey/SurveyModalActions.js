import { Alert } from 'react-native';

import {
    DISMISS_SURVEY,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SurveySelectors from 'app/redux/selectors/SurveySelectors';
import * as AppStateSelectors from 'app/redux/selectors/AppStateSelectors';
import * as SurveyActionCreators from 'app/redux/shared_actions/SurveyActionCreators';

export const closeSurvey = () => (dispatch, getState) => {
    // log analytics
    const state = getState();
    logCloseSurveyAnalytics(state);

    // present
    Alert.alert(
        "Finished taking our survey?",
        null,
        [
            {
                text: 'Later',
                onPress: () => {
                    dispatch(later());
                },
            },
            {
                text: "Finished",
                onPress: () => {
                    dispatch(finish());
                },
            },
            {
                text: 'I Hate Data',
                onPress: () => {
                    dispatch(optout());
                },
                style: 'destructive'
            },
        ]
    );
};

export const optout = () => (dispatch, getState) => {
    // analytics
    const state = getState();
    logOptOutSurveyAnalytics(state);
    resetScreen(state);

    dispatch(SurveyActionCreators.completeSurvey());
};

export const finish = () => (dispatch, getState) => {
    // analytics
    const state = getState();
    logFinishSurveyAnalytics(state);
    resetScreen(state);

    dispatch(SurveyActionCreators.completeSurvey());
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
            Analytics.setCurrentScreen('analysis');
            break;
        case 3: 
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
