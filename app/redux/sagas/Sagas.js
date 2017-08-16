import { all, call } from 'redux-saga/effects';

import AuthSaga from './AuthSaga';
import SuggestionsSaga from './SuggestionsSaga';
import SyncSaga from './SyncSaga';

const Sagas = function* Sagas() {
    yield all([
        call(AuthSaga),
        call(SuggestionsSaga),
        call(SyncSaga)
    ]);
};

export default Sagas;
