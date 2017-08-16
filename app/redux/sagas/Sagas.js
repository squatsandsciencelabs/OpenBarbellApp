import { all, call } from 'redux-saga/effects';

import KillSwitchSaga from './KillSwitchSaga';
import TokenSaga from './TokenSaga';
import AuthSaga from './AuthSaga';
import SuggestionsSaga from './SuggestionsSaga';
import SyncSaga from './SyncSaga';

const Sagas = function* Sagas() {
    yield all([
        call(KillSwitchSaga),
        call(TokenSaga),
        call(AuthSaga),
        call(SuggestionsSaga),
        call(SyncSaga)
    ]);
};

export default Sagas;
