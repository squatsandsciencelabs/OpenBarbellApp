import {
    SAVE_USER,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT
} from 'app/ActionTypes';

const AuthReducer = (state = createDefaultState(), action) => {
    switch (action.type) {
        case SAVE_USER:
            return saveUser(state, action);
        case LOGIN_REQUEST:
            return loginRequest(state, action);
        case LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case LOGOUT:
            return logout(state, action);
        default:
            return state;
    }
};

const createDefaultState = () => ({
    accessToken: null,
    refreshToken: null,
    email: null,
    isLoggingIn: false
});

const saveUser = (state, action) => {
    let changes = {
        accessToken: action.accessToken,
        refreshToken: action.refreshToken
    };

    if (action.email !== undefined) {
        changes.email = action.email;
    }

    return Object.assign({}, state, changes);
};

const loginRequest = (state, action) => {
    return Object.assign({}, state, {
        isLoggingIn: true
    });
};

const loginSuccess = (state, action) => {
    return Object.assign({}, state, {
        isLoggingIn: false,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        email: action.email
    });
};

const logout = (state, action) => {
    return Object.assign({}, state, {
        isLoggingIn: false,
        accessToken: null,
        refreshToken: null,
        email: null
    });
};

export default AuthReducer;
