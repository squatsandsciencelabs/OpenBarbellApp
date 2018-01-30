// This scheme was built on the assumption that users log in EACH TIME manually, and that's patently untrue

import {
    take,
    call,
    put,
    cancelled,
    cancel,
    fork,
    apply,
    select,
} from 'redux-saga/effects';
import { Alert, Platform } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';

import {
    STORE_INITIALIZED,
    LOGIN_REQUEST,
    LOGOUT,
    CLEAR_TOKENS,
} from 'app/ActionTypes';
import API from 'app/services/API';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';
import * as AuthActionCreators from 'app/redux/shared_actions/AuthActionCreators';
import * as Analytics from 'app/services/Analytics';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

const AuthSaga = function * AuthSaga() {
    // handle anonymous logins
    yield fork(executeAnonymousLogin);
    
    while (true) {
        // login
        const task = yield fork(executeLogin);

        // logout
        yield take([LOGOUT, CLEAR_TOKENS]);
        yield cancel(task);
        try {
            // reset and logout
            Analytics.setUserID();
            const user = yield apply(GoogleSignin, GoogleSignin.currentUserAsync);
            yield apply(GoogleSignin, GoogleSignin.signOut);

            // analytics
            const state = yield select();
            logLogoutAnalytics(state);
        } catch(error) {
            console.tron.log("LOGOUT SIGN OUT ERROR " + error);
            const state = yield select();
            logLogoutErrorAnalytics(state, error);
        }
    }
};

function* executeAnonymousLogin() {
    while(true) {
        try {
            yield take([STORE_INITIALIZED, CLEAR_TOKENS, LOGOUT]);

            // login immediately
            let refreshToken = yield select(AuthSelectors.getRefreshToken);
            if (!refreshToken) {
                let json = yield call(API.loginAnonymously);
                yield put(AuthActionCreators.saveTokens(json.accessToken, json.refreshToken, new Date()));

                // analytics
                const state = yield select();
                logLoginAnonymouslyAnalytics(state);
            }
        } catch(error) {
            console.tron.log("ERROR CODE " + error.code + " ERROR " + error);
            const state = yield select();
            logLoginAnonymouslyErrorAnalytics(state, error);
        }
    }
}

function* executeLogin() {
    while (true) {
        try {
            yield take(LOGIN_REQUEST);

            // sign into google
            let state = yield select();
            logAttemptLoginGoogleAnalytics(state);
            const user = yield apply(GoogleSignin, GoogleSignin.signIn);

            // sign into our servers
            Analytics.setUserID(user.id);
            state = yield select();
            logAttemptLoginOpenBarbellAnalytics(state);
            let json = yield call(API.login, user.idToken);

            // success
            yield put(AuthActionCreators.loginSucceeded(json.accessToken, json.refreshToken, user.email, new Date(), json.revision, json.sets));
            state = yield select();
            logLoginAnalytics(state);
        } catch(error) {
            console.tron.log("ERROR CODE " + error.code + " ERROR " + error);
            if (error.code === -5 || error.code === 12501) {
                // -5 is when the user cancels the sign in on iOS
                // 12501 is when the user cancels the sign in on Android
                let state = yield select();
                logCancelLoginAnalytics(state);
            } else {
                showGenericAlert();
                let state = yield select();
                logLoginErrorAnalytics(state, error);
            }
            yield put(AuthActionCreators.logout());
        } finally {
            if (yield cancelled()) {
                // TODO: Fix double logout on errors
                // Login Error causes a logout, which will cause a cancel of login, which then causes a second logout
                // not a big deal as it's an edge case, but would be nice to fix
                yield put(AuthActionCreators.logout());
            }
        }
    }
}

// ALERTS

const showGenericAlert = () => {
    alert("Oops!", "Something went wrong during the signin process, please try again.");
};

const alert = (title, message) => {
    if (Platform.OS === 'ios') {
        // timeout is required to get around the window switching that the google sign in does on iOS
        // without it, the alert will not show
        setTimeout(() => { 
            Alert.alert(
                title,
                message,
            );
        }, 500);
    } else {
        // execute immediately on android
        Alert.alert(
            title,
            message,
        );
    }
};

// ANALYTICS

const logAttemptLoginGoogleAnalytics = (state) => {
    Analytics.logEventWithAppState('attempt_login_google', {
    }, state);
};

const logAttemptLoginOpenBarbellAnalytics = (state) => {
    Analytics.logEventWithAppState('attempt_login_openbarbell', {
    }, state);
};

const logCancelLoginAnalytics = (state) => {
    Analytics.logEventWithAppState('cancel_login', {
    }, state);
};

const logLoginErrorAnalytics = (state, error) => {
    Analytics.logErrorWithAppState(error, 'login_error', {
    }, state);
};

// TODO: test this
// this is waiting for a system to test sagas
const logLoginAnalytics = (state) => {
    const revision = SetsSelectors.getRevision(state);
    const has_nonzero_revision = revision > 0;

    Analytics.logEventWithAppState('login', {
        revision: revision,
        has_nonzero_revision: has_nonzero_revision,
    }, state);
};

const logLoginAnonymouslyAnalytics = (state) => {
    Analytics.logEventWithAppState('login_anonymously', {
    }, state);
};

const logLoginAnonymouslyErrorAnalytics = (state, error) => {
    Analytics.logErrorWithAppState(error, 'login_anonymously_error', {
    }, state);
};

const logLogoutErrorAnalytics = (state, error) => {
    Analytics.logErrorWithAppState(error, 'logout_error', {
    }, state);
};

const logLogoutAnalytics = (state) => {
    Analytics.logEventWithAppState('logout', {
    }, state);
};

export default AuthSaga;
