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
import CollapseRemovedSetSaga from './CollapseRemovedSetSaga';
import SurveySaga from './SurveySaga';

const Sagas = function* Sagas() {
    yield all([
        call(KillSwitchSaga),
        call(TokenSaga),
        call(AuthSaga),
        call(SuggestionsSaga),
        call(SyncSaga),
        call(TimerSaga),
        call(TimerUnlockSaga),
        call(EndOldWorkoutSaga),
        call(ReconnectSaga),
        call(CollapseRemovedSetSaga),
        call(SurveySaga),
    ]);
};

export default Sagas;
