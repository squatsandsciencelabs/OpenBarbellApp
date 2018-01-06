import {
    takeEvery,
    put,
    apply,
    all,
    call,
    select,
} from 'redux-saga/effects';
import { Alert } from 'react-native';

import { 
    STORE_INITIALIZED,
    CHANGE_TAB,
    END_WORKOUT,
    PRESENT_SURVEY,
} from 'app/ActionTypes';
import firebase from 'app/services/Firebase';
import * as Analytics from 'app/services/Analytics';
import * as SurveyActionCreators from 'app/redux/shared_actions/SurveyActionCreators';
import * as SurveySelectors from 'app/redux/selectors/SurveySelectors';

const SurveySaga = function * SurveySaga() {
    yield all([
        takeEvery(STORE_INITIALIZED, updateSurveyURL),
        takeEvery(CHANGE_TAB, updateSurveyURL),
        takeEvery(END_WORKOUT, askSurvey),
    ]);
};

function* updateSurveyURL() {
    const fbconfig = firebase.config();
    let state = null;
    try {
        // fetch
        // yield apply(fbconfig, fbconfig.fetch, [0]); // USE THIS INSTEAD FOR DEBUGGING AS IT REFRESHES INSTANTLY
        yield apply(fbconfig, fbconfig.fetch);

        // activate
        const activated = yield apply(fbconfig, fbconfig.activateFetched);
        if (!activated) {
            console.tron.log("Fetched data not activated");
            state = yield select();
            logUpdateSurveyURLErrorAnalytics('fetched data not activated', state);
        }

        // get url
        const snapshot = yield apply(fbconfig, fbconfig.getValue, ['survey_url']);
        const url = snapshot.val();

        // analytics
        state = yield select();
        logUpdateSurveyURLAnalytics(url, state);

        // action
        yield put(SurveyActionCreators.saveSurveyURL(url));
    } catch(error) {
        if (error === null) {
            var errorString = '';
        } else {
            var errorString = JSON.stringify(error);
        }
        logUpdateSurveyURLErrorAnalytics(errorString, state);
        console.tron.log(errorString);
    }
}

function* askSurvey(action) {
    // only do this for manually ended workouts
    if (!action.manual) {
        return;
    }

    // only do this if the survey is available
    const surveyAvailable = yield select(SurveySelectors.getSurveyAvailable);
    if (!surveyAvailable) {
        return;
    }

    let state = null;

    // alert and present
    try {
        // prompt
        state = yield select();
        logPromptSurveyAnalytics(state);
        yield call(showSurveyAlert);

        // present
        state = yield select();
        logPromptSurveyTakeNowAnalytics(state);
        yield put(SurveyActionCreators.presentSurvey());
    } catch(error) {
        // was canceled
        state = yield select();
        logPromptSurveyFillLaterAnalytics(state);
    }
}

function showSurveyAlert() {
    return new Promise((resolve, reject) => {
        Alert.alert(
            null,
            "Thanks for using OpenBarbell! We'd love your feedback, would you mind taking a quick survey?",
            [
                {
                    text: 'Later',
                    onPress: () => {
                        // TODO: analytics
                        reject();
                    },
                    style: 'cancel'
                },
                {
                    text: "Sure",
                    onPress: () => {
                        // TODO: analytics
                        resolve();
                    },
                },
            ]
        );
    });
}

// ANALYTICS

const logPromptSurveyAnalytics = (state) => {
    Analytics.logEventWithAppState('prompt_survey', {
        url: SurveySelectors.getURL(state),
    }, state);
};

const logPromptSurveyFillLaterAnalytics = (state) => {
    Analytics.logEventWithAppState('prompt_survey_fill_later', {
        url: SurveySelectors.getURL(state),
    }, state);
};

const logPromptSurveyTakeNowAnalytics = (state) => {
    Analytics.logEventWithAppState('prompt_survey_take_now', {
        url: SurveySelectors.getURL(state),
    }, state);
};

const logUpdateSurveyURLAnalytics = (url, state) => {
    Analytics.logEventWithAppState('update_survey_url', {
        url: url,
    }, state);
};

const logUpdateSurveyURLErrorAnalytics = (error, state) => {
    Analytics.logEventWithAppState('update_survey_url_error', {
        error: error,
    }, state);
};

export default SurveySaga;
