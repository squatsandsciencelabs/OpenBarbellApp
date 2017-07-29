import * as AuthActionCreators from 'app/redux/shared_actions/AuthActionCreators';

export const signIn = () => {
    return AuthActionCreators.signIn();
};

export const signOut = () => {
    return AuthActionCreators.signOut();
};
