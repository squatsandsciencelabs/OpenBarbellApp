import { Alert } from 'react-native';

import {
    LOGIN_SUCCESS,
    LOGOUT,
    SAVE_TOKENS,
    TOKENS_READY,
    CLEAR_TOKENS,
    LOGIN_REQUEST,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';

export const requestLogin = () => ({
    type: LOGIN_REQUEST,
});

export const loginSucceeded = (accessToken, refreshToken, email, date = new Date(), revision = null, sets = null) => ({
    type: LOGIN_SUCCESS,
    accessToken: accessToken,
    refreshToken: refreshToken,
    email: email,
    syncDate: date,
    revision: revision,
    sets: sets
});

export const logout = (forceLogout=false) => (dispatch, getState) => {
    const state = getState();

    if (!AuthSelectors.getIsLoggedIn(state)) {
        // you're already logged out, just grab new tokens
        dispatch({
            type: CLEAR_TOKENS
        });
    } else {
        // you're logged in

        // force logout if it's a 401
        if (forceLogout) {
            logForceLogoutAnalytics(state);
            Alert.alert("Important", "As it's been awhile since you've signed on, you've been logged out! Please login again.");        
        }

        // logout, be it forced or from user manually logging out
        dispatch({
            type: LOGOUT
        });
    }
};

export const saveTokens = (accessToken, refreshToken, lastRefreshDate) => ({
    type: SAVE_TOKENS,
    accessToken: accessToken,
    refreshToken: refreshToken,
    lastRefreshDate: lastRefreshDate
});

export const tokensReady = () => ({ type: TOKENS_READY });

// ANALYTICS

const logForceLogoutAnalytics = (state) => {
    Analytics.logEventWithAppState('force_logout', {
    }, state);
};
