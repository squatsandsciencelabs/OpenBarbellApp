import { take, put, call } from 'redux-saga/effects';

import { 
    STORE_INITIALIZED
} from 'app/ActionTypes';
import * as SurveyActionCreators from 'app/redux/shared_actions/SurveyActionCreators';

const SurveySaga = function * TimerSaga() {
    yield take(STORE_INITIALIZED);
    try {
        yield call(firebase.config().fetch);
        const activated = yield call(firebase.config().activateFetched);
        if (!activated) {
            console.tron.log("Fetched data not activated");
            // TODO: analytics here for problems
        }
        const snapshot = yield call(firebase.config().getValue, 'survey_url');
        const url = snapshot.val();
        yield put(SurveyActionCreators.saveSurveyURL(url));
    } catch(error) {
        // TODO: analytics here for problems
        console.tron.log(error);
    }
};
