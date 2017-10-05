import { Alert } from 'react-native';
import {
    LOGIN_SUCCESS,
    LOGOUT,
    SAVE_TOKENS,
    TOKENS_READY
} from 'app/ActionTypes';
import * as Analytics from 'app/utility/Analytics';

export const loginSucceeded = (accessToken, refreshToken, email, date = new Date(), revision = null, sets = null) => {
    Analytics.setUserProp('email', email);

    return {
        type: LOGIN_SUCCESS,
        accessToken: accessToken,
        refreshToken: refreshToken,
        email: email,
        syncDate: date,
        revision: revision,
        sets: sets
    }
};

export const logout = (showMessage = false) => {
    Analytics.setUserProp('email', '');

    if (showMessage) {
        Alert.alert("Important", "As it's been awhile since you've signed on, you've been logged out! Please login again.");
    }

    return { type: LOGOUT };
};

export const saveTokens = (accessToken, refreshToken, lastRefreshDate) => ({
    type: SAVE_TOKENS,
    accessToken: accessToken,
    refreshToken: refreshToken,
    lastRefreshDate: lastRefreshDate
});

export const tokensReady = () => ({ type: TOKENS_READY });