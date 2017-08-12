import { all, call } from 'redux-saga/effects';

import AuthSaga from './AuthSaga';
import SuggestionsSaga from './SuggestionsSaga';

const Sagas = function* Sagas() {
    yield all([
        call(AuthSaga),
        call(SuggestionsSaga)
    ]);
};

export default Sagas;
