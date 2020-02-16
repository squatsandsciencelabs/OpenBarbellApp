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
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

import {
    STORE_INITIALIZED,
    LOGIN_REQUEST,
    LOGOUT,
    CLEAR_TOKENS,
    REAUTHENTICATE_REQUEST,
} from 'app/configs+constants/ActionTypes';
import API from 'app/services/API';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';
import * as AuthActionCreators from 'app/redux/shared_actions/AuthActionCreators';
import * as Analytics from 'app/services/Analytics';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

const AuthSaga = function * AuthSaga() {
    // handle anonymous logins
    yield fork(executeAnonymousLogin);

    // handle initial authentication
    yield call(executeInitialAuthentication);
    
    while (true) {
        // login
        const loginTask = yield fork(executeLogin);
        const reauthenticateTask = yield fork(executeReauthenticate);

        // logout
        yield take([LOGOUT, CLEAR_TOKENS]);
        yield cancel(loginTask);
        yield cancel(reauthenticateTask);
        try {
            // reset and logout
            Analytics.setUserID();
            const isSignedIn = yield apply(GoogleSignin, GoogleSignin.isSignedIn);
            if (isSignedIn) {
                yield apply(GoogleSignin, GoogleSignin.revokeAccess);
                yield apply(GoogleSignin, GoogleSignin.signOut);
            }

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

function *executeInitialAuthentication() {
    yield take(STORE_INITIALIZED);
    const isLoggedIn = yield select(AuthSelectors.getIsLoggedIn);
    if (!isLoggedIn) {
        return;
    }

    try {
        const isSignedIn = yield apply(GoogleSignin, GoogleSignin.isSignedIn);
        if (isSignedIn) {
            // normal silent sign in
            yield apply(GoogleSignin, GoogleSignin.signInSilently);
        } else {
            console.tron.log(`Error, redux says you're signed in but google does not agree, calling full reauthentication process`);
            yield call(executeReauthenticateLoggedInUser);
        }
    } catch (err) {
        console.tron.log(`ERROR INITIAL AUTH, not sure what to do so reauthenticating to be safe ${err}`);
        yield call(executeReauthenticateLoggedInUser);
    }
}

function* executeLogin() {
    try {
        yield take(LOGIN_REQUEST);

        // sign into google
        let state = yield select();
        logAttemptLoginGoogleAnalytics(state);
        yield apply(GoogleSignin, GoogleSignin.hasPlayServices);
        const userInfo = yield apply(GoogleSignin, GoogleSignin.signIn);

        // sign into our servers
        Analytics.setUserID(userInfo.user.id);
        state = yield select();
        logAttemptLoginOpenBarbellAnalytics(state);
        let json = yield call(API.login, userInfo.idToken);

        // success
        yield put(AuthActionCreators.loginSucceeded(json.accessToken, json.refreshToken, userInfo.user.email, new Date(), json.revision, json.sets));
        state = yield select();
        logLoginAnalytics(state);
    } catch(error) {
        console.tron.log("ERROR CODE " + error.code + " ERROR " + error);
        let state = yield select();
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // previously -5 is iOS cancel and 12501 is Android cancel
            logCancelLoginAnalytics(state);
        } else {
            showSignInErrorAlert();
            logLoginErrorAnalytics(state, error);
        }
        // TODO: consider adding "in progress" error and play services not available specific error
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

function* executeReauthenticate() {
    while (true) {
        yield take(REAUTHENTICATE_REQUEST);
        const isLoggedIn = yield select(AuthSelectors.getIsLoggedIn);
        if (isLoggedIn) {
            yield call(executeReauthenticateLoggedInUser);
        } else {
            yield call(executeReauthenticateLoggedOutUser);
        }
    }
}

function* executeReauthenticateLoggedOutUser() {
    // this will cause CLEAR_TOKENS to be called, thereby creating a new anonymous user
    yield put(AuthActionCreators.logout(false));
    const state = yield select();
    logReauthenticateAnonymousAnalytics(state);
}

function* executeReauthenticateLoggedInUser() {
    try {
        // sign into google
        let state = yield select();
        logAttemptReauthenticateGoogleAnalytics(state);
        yield apply(GoogleSignin, GoogleSignin.hasPlayServices);
        const isSignedIn = yield apply(GoogleSignin, GoogleSignin.isSignedIn);
        let userInfo = null;
        if (isSignedIn) {
            userInfo = yield apply(GoogleSignin, GoogleSignin.signInSilently);
        } else {
            userInfo = yield apply(GoogleSignin, GoogleSignin.signIn);
        }

        // sign into our servers
        Analytics.setUserID(userInfo.user.id);
        state = yield select();
        logAttemptReauthenticateOpenBarbellAnalytics(state);
        let json = yield call(API.login, userInfo.idToken);

        const origEmail = yield select(AuthSelectors.getEmail);
        const isDifferentUser = origEmail !== userInfo.user.email;
        if (isDifferentUser) {
            // switch accounts, aka lose everything
            yield put(AuthActionCreators.loginSucceeded(json.accessToken, json.refreshToken, userInfo.user.email, new Date(), json.revision, json.sets));
        } else {
            // success
            // note that we do not utilize the revisions or the set data
            // reason being that we only want to exchange our google token for access and refresh tokens
            // data cannot be pulled yet as they might have data waiting to go to the server first
            yield put(AuthActionCreators.reauthenticateSucceeded(json.accessToken, json.refreshToken, userInfo.user.email, new Date()));
        }
        state = yield select();
        logReauthenticatedAnalytics(state, isDifferentUser);
    } catch(error) {
        console.tron.log("ERROR CODE " + error.code + " ERROR " + error);
        let state = yield select();
        if (error.code === statusCodes.SIGN_IN_CANCELLED || error.code === statusCodes.SIGN_IN_REQUIRED) {
            // previously -5 is iOS cancel and 12501 is Android cancel
            logCancelReauthenticateAnalytics(state);
            yield put(AuthActionCreators.logout(true)); // this will pop the alert
        } else {
            // actual error
            logReauthenticateErrorAnalytics(state, JSON.stringify(error));
            if (error.type === "401") {
                // server rejected, NOW logout
                yield put(AuthActionCreators.logout(true)); // this will pop the alert
            }
        }
    }
    // NOTE: theoretically don't need the finally logout call as canceling executeLogin should handle that
}

// ALERTS

const showSignInErrorAlert = () => {
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

// login

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

// reauth

const logAttemptReauthenticateGoogleAnalytics = (state) => {
    Analytics.logEventWithAppState('attempt_reauthenticate_google', {
    }, state);
};

const logAttemptReauthenticateOpenBarbellAnalytics = (state) => {
    Analytics.logEventWithAppState('attempt_reauthenticate_openbarbell', {
    }, state);
};

const logCancelReauthenticateAnalytics = (state) => {
    Analytics.logEventWithAppState('cancel_reauthenticate', {
    }, state);
};

const logReauthenticateErrorAnalytics = (state, error) => {
    Analytics.logErrorWithAppState(error, 'reauthenticate_error', {
    }, state);
};

const logReauthenticatedAnalytics = (state, isDiffUser) => {
    Analytics.logEventWithAppState('reauthenticated', {
        is_diff_user: isDiffUser,
    }, state);
};

const logReauthenticateAnonymousAnalytics = (state) => {
    Analytics.logEventWithAppState('reauthenticated_anonymous', {
    }, state);
};

// anonymous

const logLoginAnonymouslyAnalytics = (state) => {
    Analytics.logEventWithAppState('login_anonymously', {
    }, state);
};

const logLoginAnonymouslyErrorAnalytics = (state, error) => {
    Analytics.logErrorWithAppState(error, 'login_anonymously_error', {
    }, state);
};

// logout

const logLogoutErrorAnalytics = (state, error) => {
    Analytics.logErrorWithAppState(error, 'logout_error', {
    }, state);
};

const logLogoutAnalytics = (state) => {
    Analytics.logEventWithAppState('logout', {
    }, state);
};

export default AuthSaga;
