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
} from 'app/configs+constants/ActionTypes';
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
            // NOTE: not logging this as it appears to still work regardless of activation?
            // state = yield select();
            // logUpdateSurveyURLErrorAnalytics(state, 'fetched data not activated');
        }

        // get url
        const snapshot = yield apply(fbconfig, fbconfig.getValue, ['survey_url']);
        const url = snapshot.val();

        // analytics
        state = yield select();
        logUpdateSurveyURLAnalytics(state, url);

        // action
        yield put(SurveyActionCreators.saveSurveyURL(url));
    } catch (error) {
        if (state === null) {
            state = yield select();
        }
        logUpdateSurveyURLErrorAnalytics(state, error);
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
    const canPromptSurvey = yield select(SurveySelectors.getCanPromptEndWorkoutSurvey);
    if (!canPromptSurvey) {
        return;
    }

    let state = null;

    // alert and present
    try {
        // prompt
        state = yield select();
        logPromptSurveyAnalytics(state);
        const result = yield call(showSurveyAlert);

        // present
        state = yield select();
        logPromptSurveyTakeNowAnalytics(state);
        yield put(SurveyActionCreators.presentSurvey());
    } catch(error) {
        if (error === 'Later') {
            // was canceled
            state = yield select();
            logPromptSurveyFillLaterAnalytics(state);
        } else if (error === 'I Hate Data') {
            // hate data
            yield put(SurveyActionCreators.optOutEndWorkoutSurveyPrompt());
            state = yield select();
            logPromptSurveyOptOutAnalytics(state);
        }
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
                        reject('Later');
                    },
                },
                {
                    text: "Sure",
                    onPress: () => {
                        resolve();
                    },
                },
                {
                    text: 'I Hate Data',
                    onPress: () => {
                        reject('I Hate Data');
                    },
                    style: 'destructive'
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

const logPromptSurveyOptOutAnalytics = (state) => {
    Analytics.logEventWithAppState('prompt_survey_opt_out', {
        url: SurveySelectors.getURL(state),
    }, state);
};

const logPromptSurveyTakeNowAnalytics = (state) => {
    Analytics.logEventWithAppState('prompt_survey_take_now', {
        url: SurveySelectors.getURL(state),
    }, state);
};

const logUpdateSurveyURLAnalytics = (state, url) => {
    Analytics.logEventWithAppState('update_survey_url', {
        url: url,
    }, state);
};

const logUpdateSurveyURLErrorAnalytics = (state, error) => {
    Analytics.logErrorWithAppState(error, 'update_survey_url_error', {
    }, state);
};

export default SurveySaga;
