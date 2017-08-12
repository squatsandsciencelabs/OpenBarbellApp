import * as AuthActionCreators from 'app/redux/shared_actions/AuthActionCreators';

import {
    LOGIN_REQUEST
} from 'app/ActionTypes';

export const signIn = () => ({ type: LOGIN_REQUEST });

export const signOut = () => {
    return AuthActionCreators.logout();
};
