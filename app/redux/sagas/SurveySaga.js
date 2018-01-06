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
    try {
        // fetch
        // yield apply(fbconfig, fbconfig.fetch, [0]); // USE THIS INSTEAD FOR DEBUGGING AS IT REFRESHES INSTANTLY
        yield apply(fbconfig, fbconfig.fetch);

        // activate
        const activated = yield apply(fbconfig, fbconfig.activateFetched);
        if (!activated) {
            console.tron.log("Fetched data not activated");
            // TODO: analytics here for problems
        }

        // get url
        const snapshot = yield apply(fbconfig, fbconfig.getValue, ['survey_url']);
        const url = snapshot.val();

        // action
        yield put(SurveyActionCreators.saveSurveyURL(url));
    } catch(error) {
        // TODO: analytics here for problems
        console.tron.log(JSON.stringify(error));
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

    // alert and present
    try {
        yield call(showSurveyAlert);
        // TODO: analytics
        yield put(SurveyActionCreators.presentSurvey());
    } catch(error) {
        // was canceled
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

export default SurveySaga;
