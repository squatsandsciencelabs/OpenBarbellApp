// TODO: code this to eventually do it based on a timing
// like if it has been X amount of time pass, then do it
// right now it's coded to happen only once on startup

import { take, select, put, call } from 'redux-saga/effects';

import {
    OBTAIN_NEW_TOKENS
} from 'app/ActionTypes';
import API from 'app/services/API';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';
import * as AuthActionCreators from 'app/redux/shared_actions/AuthActionCreators';

const TokenSaga = function * TokenSaga() {
    yield take(OBTAIN_NEW_TOKENS);
    const refreshToken = yield select(AuthSelectors.getRefreshToken);

    // valid check
    if (refreshToken === null) {
        console.tron.log("No refresh token, do not obtain new set of tokens");
        return;
    }

    try {
        const json = yield call(API.obtainNewTokens, refreshToken);
        yield put(AuthActionCreators.saveTokens(json.accessToken, json.refreshToken));
    } catch(error) {
        if (error.type !== undefined) {
            yield put(error);
        }
        console.tron.log(JSON.stringify(error));
    }
};

export default TokenSaga;
