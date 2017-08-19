// TODO: code this to eventually do it based on a timing
// like if it has been X amount of time pass, then do it
// right now it's coded to happen only once on startup

import { takeEvery, select, put, call, all } from 'redux-saga/effects';

import {
    CHANGED_TAB,
    OBTAIN_NEW_TOKENS
} from 'app/ActionTypes';

import OpenBarbellConfig from 'app/configs/OpenBarbellConfig.json';
import API from 'app/services/API';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';
import * as AuthActionCreators from 'app/redux/shared_actions/AuthActionCreators';
import * as ApiActionCreators from 'app/redux/shared_actions/ApiActionCreators';

const TokenSaga = function * TokenSaga() {
    yield all([
        takeEvery(CHANGED_TAB, obtainNewTokens),
        takeEvery(OBTAIN_NEW_TOKENS, obtainNewTokens)        
    ]);
};

function* obtainNewTokens() {
    // check has token
    const refreshToken = yield select(AuthSelectors.getRefreshToken);    
    if (refreshToken === null) {
        console.tron.log("cannot refresh as no refresh token");
        return;
    }

    // check should refresh
    const lastRefreshDateString = yield select(AuthSelectors.getLastRefreshDate);
    let lastRefreshDate = new Date(lastRefreshDateString);
    if (!shouldRequestNewToken(lastRefreshDate)) {
        console.tron.log("hasn't been long enough to refresh " + lastRefreshDate + " " + OpenBarbellConfig.obtainTokenTimer + " vs " + Math.abs(new Date() - lastRefreshDate));
    } else {
        console.tron.log("refreshing tokens");
        try {
            const json = yield call(API.obtainNewTokens, refreshToken);
            yield put(AuthActionCreators.saveTokens(json.accessToken, json.refreshToken, new Date()));
        } catch(error) {
            if (error.type !== undefined) {
                yield put(error);
            }
            console.tron.log(JSON.stringify(error));
        }
    }

    yield put(ApiActionCreators.syncData());    
}

const shouldRequestNewToken = (lastRefreshDate) => lastRefreshDate === null || Math.abs(new Date() - lastRefreshDate) > OpenBarbellConfig.obtainTokenTimer;

export default TokenSaga;
