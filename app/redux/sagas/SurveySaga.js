import { take, put, apply } from 'redux-saga/effects';

import { 
    STORE_INITIALIZED
} from 'app/ActionTypes';
import firebase from 'app/services/Firebase';
import * as SurveyActionCreators from 'app/redux/shared_actions/SurveyActionCreators';

const SurveySaga = function * SurveySaga() {
    yield take(STORE_INITIALIZED);
    const fbconfig = firebase.config();
    try {
        yield apply(fbconfig, fbconfig.fetch, [0]); // TODO: remove the [0] when not debugging
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
};

export default SurveySaga;
