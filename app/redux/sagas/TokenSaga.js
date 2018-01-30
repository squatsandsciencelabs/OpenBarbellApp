import { takeEvery, select, put, call, all } from 'redux-saga/effects';

import {
    CHANGE_TAB,
    STORE_INITIALIZED,
    CLEAR_TOKENS,
} from 'app/ActionTypes';

import OpenBarbellConfig from 'app/configs/OpenBarbellConfig.json';
import API from 'app/services/API';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';
import * as AuthActionCreators from 'app/redux/shared_actions/AuthActionCreators';
import * as DateUtils from 'app/utility/transforms/DateUtils';
import * as Analytics from 'app/services/Analytics';

const TokenSaga = function * TokenSaga() {
    yield all([
        takeEvery(CHANGE_TAB, executeObtainNewTokens),
        takeEvery(STORE_INITIALIZED, executeObtainNewTokens),
        takeEvery(CLEAR_TOKENS, executeObtainNewTokens), // for anonymous
    ]);
};

function* executeObtainNewTokens() {
    const isLoggedIn = yield select(AuthSelectors.getIsLoggedIn);
    if (isLoggedIn) {
        yield call(obtainNewTokens);
    } else {
        yield call(obtainNewAnonymousTokens);
    }
}

function* obtainNewTokens() {
    // check has token
    const refreshToken = yield select(AuthSelectors.getRefreshToken);    
    if (refreshToken === null) {
        console.tron.log("cannot refresh as no refresh token");
        return;
    }

    // check should refresh
    var lastRefreshDate = yield select(AuthSelectors.getLastRefreshDate);
    lastRefreshDate = DateUtils.getDate(lastRefreshDate);
    if (!shouldRequestNewToken(lastRefreshDate)) {
        console.tron.log("hasn't been long enough to refresh " + lastRefreshDate + " " + OpenBarbellConfig.obtainTokenTimer + " vs " + Math.abs(new Date() - lastRefreshDate));
    } else {
        console.tron.log("refreshing tokens");

        try {
            // refresh
            let state = yield select();
            logAttemptRefreshTokenAnalytics(state);
            const json = yield call(API.obtainNewTokens, refreshToken);

            // success
            state = yield select();
            logRefreshedTokenAnalytics(state);
            yield put(AuthActionCreators.saveTokens(json.accessToken, json.refreshToken, new Date()));
        } catch(error) {
            let state = yield select();
            logRefreshTokenErrorAnalytics(state, error, refreshToken);
            if (error.type === '401') {
                // request a sign in because the tokens can't be refreshed
                yield put(AuthActionCreators.requestReauthenticate());
            } else if (error.type !== undefined || typeof error === 'function') {
                // unknown error type, just propogate it
                yield put(error);
            }
            console.tron.log(JSON.stringify(error));
        }
    }

    // ready
    yield put(AuthActionCreators.tokensReady());
}

function *obtainNewAnonymousTokens() {
    // check has token
    const refreshToken = yield select(AuthSelectors.getRefreshToken);    
    if (refreshToken === null) {
        console.tron.log("cannot refresh as no refresh token");
        return;
    }

    // check should refresh
    var lastRefreshDate = yield select(AuthSelectors.getLastRefreshDate);
    lastRefreshDate = DateUtils.getDate(lastRefreshDate);
    if (!shouldRequestNewToken(lastRefreshDate)) {
        console.tron.log("hasn't been long enough to refresh anonymous " + lastRefreshDate + " " + OpenBarbellConfig.obtainTokenTimer + " vs " + Math.abs(new Date() - lastRefreshDate));
    } else {
        console.tron.log("refreshing anonymous tokens");

        try {
            // refresh
            let state = yield select();
            logAttemptRefreshAnonymousTokenAnalytics(state);
            const json = yield call(API.obtainNewAnonymousTokens, refreshToken);

            // success
            state = yield select();
            logRefreshedAnonymousTokenAnalytics(state);
            yield put(AuthActionCreators.saveTokens(json.accessToken, json.refreshToken, new Date()));
        } catch(error) {
            let state = yield select();
            logRefreshAnonymousTokenErrorAnalytics(state, error, refreshToken);
            if (error.type !== undefined || typeof error === 'function') {
                yield put(error);
            }
            yield put(AuthActionCreators.logout()); // logging out of a logged out user just clear tokens
            console.tron.log(JSON.stringify(error));
        }
    }

    // ready
    yield put(AuthActionCreators.tokensReady());
}

const shouldRequestNewToken = (lastRefreshDate) => lastRefreshDate === null || Math.abs(new Date() - lastRefreshDate) > OpenBarbellConfig.obtainTokenTimer;

// ANALYTICS

const logAttemptRefreshTokenAnalytics = (state) => {
    Analytics.logEventWithAppState('attempt_refresh_token', {
    }, state);
};

const logRefreshTokenErrorAnalytics = (state, error, refreshToken) => {
    Analytics.logErrorWithAppState(error, 'refresh_token_error', {
        refresh_token: refreshToken,
    }, state);
};

const logRefreshedTokenAnalytics = (state) => {
    Analytics.logEventWithAppState('refreshed_token', {
    }, state);
};

const logAttemptRefreshAnonymousTokenAnalytics = (state) => {
    Analytics.logEventWithAppState('attempt_refresh_anonymous_token', {
    }, state);
};

const logRefreshAnonymousTokenErrorAnalytics = (state, error, refreshToken) => {
    Analytics.logErrorWithAppState(error, 'refresh_anonymous_token_error', {
        refresh_token: refreshToken,
    }, state);
};

const logRefreshedAnonymousTokenAnalytics = (state) => {
    Analytics.logEventWithAppState('refreshed_anonymous_token', {
    }, state);
};

export default TokenSaga;
