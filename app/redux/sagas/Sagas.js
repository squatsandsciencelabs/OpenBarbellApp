import { all, call } from 'redux-saga/effects';

import KillSwitchSaga from './KillSwitchSaga';
import TokenSaga from './TokenSaga';
import AuthSaga from './AuthSaga';
import SuggestionsSaga from './SuggestionsSaga';
import SyncSaga from './SyncSaga';
import TimerSaga from './TimerSaga';
import TimerUnlockSaga from './TimerUnlockSaga';
import EndOldWorkoutSaga from './EndOldWorkoutSaga';
import ReconnectSaga from './ReconnectSaga';
import SurveySaga from './SurveySaga';
import InitializedAnalyticsSaga from './InitializedAnalyticsSaga';
import OneRMAnalyticsSaga from './OneRMAnalyticsSaga';
import VelocityThresholdSaga from './VelocityThresholdSaga';

const Sagas = function* Sagas(dispatch) {
    yield all([
        KillSwitchSaga(),
        TokenSaga(),
        AuthSaga(),
        SuggestionsSaga(),
        SyncSaga(),
        TimerSaga(),
        TimerUnlockSaga(),
        EndOldWorkoutSaga(),
        ReconnectSaga(),
        SurveySaga(),
        InitializedAnalyticsSaga(),
        OneRMAnalyticsSaga(),
        // VelocityThresholdSaga(),
    ]);
};

export default Sagas;
