import {
    SAVE_USER,
    ATTEMPTING_LOGIN,
    FINISHED_ATTEMPT_LOGIN
} from 'app/ActionTypes';

const AuthReducer = (state = createDefaultState(), action) => {
    switch (action.type) {
        case SAVE_USER:
            return saveUser(state, action);
        case ATTEMPTING_LOGIN:
            return attemptingLogin(state, action);
        case FINISHED_ATTEMPT_LOGIN:
            return finishedAttemptLogin(state, action);
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

const attemptingLogin = (state, action) => {
    return Object.assign({}, state, {
        isLoggingIn: true
    });
};

const finishedAttemptLogin = (state, action) => {
    return Object.assign({}, state, {
        isLoggingIn: false
    });
};

export default AuthReducer;
