import { takeEvery, put, apply, all } from 'redux-saga/effects';

import { 
    STORE_INITIALIZED,
    CHANGE_TAB,
} from 'app/ActionTypes';
import firebase from 'app/services/Firebase';
import * as SurveyActionCreators from 'app/redux/shared_actions/SurveyActionCreators';

const SurveySaga = function * SurveySaga() {
    yield all([
        takeEvery(STORE_INITIALIZED, updateSurveyURL),
        takeEvery(CHANGE_TAB, updateSurveyURL),
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

export default SurveySaga;
