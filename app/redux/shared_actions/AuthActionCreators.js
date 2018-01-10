import { Alert } from 'react-native';

import {
    LOGIN_SUCCESS,
    LOGOUT,
    SAVE_TOKENS,
    TOKENS_READY
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';

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

    // don't logout if you're already logged out
    // this can happen if the refresh token 401s
    if (!AuthSelectors.getIsLoggedIn(state)) {
        return false;
    }

    if (forceLogout) {
        logForceLogoutAnalytics(state);
        Alert.alert("Important", "As it's been awhile since you've signed on, you've been logged out! Please login again.");        
    }

    dispatch({
        type: LOGOUT
    });
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
