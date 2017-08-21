import { take, put } from 'redux-saga/effects';
import {
    LOGIN_SUCCESS,
    LOGOUT,
    STORE_INITIALIZED
} from 'app/ActionTypes';

import * as SuggestionsActionCreators from 'app/redux/shared_actions/SuggestionsActionCreators';

const SuggestionsSaga = function * SuggestionsSaga() {
    while (true) {
        yield take([LOGIN_SUCCESS, LOGOUT, STORE_INITIALIZED]);
        yield put(SuggestionsActionCreators.updateSuggestions());
    }
};

export default SuggestionsSaga;
