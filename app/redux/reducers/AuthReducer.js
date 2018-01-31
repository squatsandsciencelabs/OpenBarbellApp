import {
    SAVE_TOKENS,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_TOKENS,
    REAUTHENTICATE_REQUEST,
    REAUTHENTICATE_SUCCESS,
} from 'app/ActionTypes';

const AuthReducer = (state = createDefaultState(), action) => {
    switch (action.type) {
        case SAVE_TOKENS:
            return saveTokens(state, action);
        case LOGIN_REQUEST:
            return loginRequest(state, action);
        case LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case REAUTHENTICATE_REQUEST:
            return reauthenticateRequest(state, action);
        case REAUTHENTICATE_SUCCESS:
            return reauthenticateSuccess(state, action);
        case LOGOUT:
        case CLEAR_TOKENS: // same action as logout ONLY in the auth reducer but nowhere else
            return logout(state, action);
        default:
            return state;
    }
};

const createDefaultState = () => ({
    accessToken: null,
    refreshToken: null,
    lastRefreshDate: null,
    email: null,
    isLoggingIn: false,
});

const saveTokens = (state, action) => {
    let changes = {
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        lastRefreshDate: action.lastRefreshDate,
    };

    return Object.assign({}, state, changes);
};

const reauthenticateRequest = (state, action) => {
    return {
        ...state,
        accessToken: 'invalid',
        refreshToken: 'invalid',
    };
};

const loginRequest = (state, action) => {
    return Object.assign({}, state, {
        isLoggingIn: true,
    });
};

const loginSuccess = (state, action) => {
    return Object.assign({}, state, {
        isLoggingIn: false,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        email: action.email,
        lastRefreshDate: action.syncDate,
    });
};

const reauthenticateSuccess = (state, action) => {
    return Object.assign({}, state, {
        isLoggingIn: false,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        email: action.email,
        lastRefreshDate: action.date,
    });
};

const logout = (state, action) => {
    return Object.assign({}, state, {
        isLoggingIn: false,
        accessToken: null,
        refreshToken: null,
        email: null,
    });
};

export default AuthReducer;
