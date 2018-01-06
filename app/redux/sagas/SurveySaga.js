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
        // TODO: do we want to fetch this every time [0] or the default every 12 hours?
        yield apply(fbconfig, fbconfig.fetch, [0]);
        const activated = yield apply(fbconfig, fbconfig.activateFetched);
        if (!activated) {
            console.tron.log("Fetched data not activated");
            // TODO: analytics here for problems
        }
        const snapshot = yield apply(fbconfig, fbconfig.getValue, ['survey_url']);
        const url = snapshot.val();
        yield put(SurveyActionCreators.saveSurveyURL(url));
    } catch(error) {
        // TODO: analytics here for problems
        console.tron.log(JSON.stringify(error));
    }
}

function* askSurvey() {
    try {
        yield call(showSurveyAlert);
        // TODO: analytics
        yield put(SurveyActionCreators.presentSurvey());
    } catch(error) {
        // TODO: analytics here for problems
        console.tron.log(JSON.stringify(error));
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
