// NOTE: must be added to the list AFTER EndOldWorkoutSaga
// Reason is that it wants to pull the number of workout sets on startup if it was indeed eliminated
// It's also why this is a saga rather than added to the StoreActionCreators

import { take, select, put } from 'redux-saga/effects';
import * as Analytics from 'app/services/Analytics';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as AnalysisActionCreators from 'app/redux/shared_actions/AnalysisActionCreators';

import {
    STORE_INITIALIZED,
} from 'app/configs+constants/ActionTypes';

const InitializedAnalyticsSaga = function * InitializedAnalyticsSaga() {
    yield take(STORE_INITIALIZED);
    const state = yield select();
    if (SetsSelectors.getIsWorkoutEmpty(state)) {
        var numWorkoutSets = 0;
    } else {
        var numWorkoutSets = SetsSelectors.getNumWorkoutSets(state);
    }

    Analytics.logEventWithAppState('initialized', {
        num_workout_sets: numWorkoutSets,
        exercise: AnalysisSelectors.getExercise(state),
        num_include_tags: AnalysisSelectors.getTagsToInclude(state),
        num_exclude_tags: AnalysisSelectors.getTagsToExclude(state),
        days_range: AnalysisSelectors.getDaysRange(state),
        velocity: AnalysisSelectors.getAnalysisVelocity(state),
        one_rep_max: AnalysisSelectors.getE1RM(state),
    }, state);

    yield put(AnalysisActionCreators.clearE1RM());
};

// TODO: write a unit test for this
// this is waiting for a system to test sagas

export default InitializedAnalyticsSaga;
