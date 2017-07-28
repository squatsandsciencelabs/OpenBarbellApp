import { Alert, Platform } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';

import {
    SAVE_USER,
    ATTEMPTING_LOGIN,
    FINISHED_ATTEMPT_LOGIN
} from 'app/ActionTypes';
import API from 'app/services/API';
import * as SetActionCreators from './SetActionCreators';
import * as AuthActionCreators from './AuthActionCreators';
import * as SettingsActionCreators from './SettingsActionCreators';
import * as SuggestionsActionCreators from './SuggestionsActionCreators';

// TODO: split this large function up into smaller pieces to be more testable
// TODO: consolidate google sign in code somehow
export const signIn = () => (dispatch) => {
    dispatch(attemptingLogin());

    GoogleSignin.signIn().then((user) => {
        console.tron.log("sign in complete! attempt to login from api!");
        // TODO: make this another ApiActionCreator thunk instead of accessing the API directly
        // TODO: success code here might need to reflect sync success code as well to reduce errors
        API.login(user.idToken, dispatch, (accessToken, refreshToken, revision, sets) => {
            console.tron.log("auth action creator now has " + accessToken + " " + refreshToken + " " + JSON.stringify(sets));
            dispatch(AuthActionCreators.saveUser(refreshToken, accessToken, user.email));
            dispatch(SetActionCreators.updateSetDataFromServer(revision, sets));
            dispatch(SettingsActionCreators.updateSyncDate(new Date()));
            dispatch(SuggestionsActionCreators.updateExerciseSuggestionsModel());
            dispatch(SuggestionsActionCreators.updateTagsSuggestionsModel());
            dispatch(finishedAttemptLogin());
        }, (err) => {
            // API login error, means we need to sign out of the google account as well
            console.tron.log('API Login Error ', err);
            executeSignOut(dispatch);
            dispatch(finishedAttemptLogin());
            showGenericAlert();
        });
    }).catch((err) => {
        // Can happen if the internet is weird and google play services can't be accessed properly
        // Can happen when the user just doesn't pick one
        // Either way, the sign in failed so you do NOT have to execute a sign out
        console.tron.log('WRONG SIGNIN', err);
        dispatch(finishedAttemptLogin());
        if (err.code !== -5) { // -5 is the error for user canceling the sign in
            showGenericAlert();
        }
    })
    .done();
};

const executeSignOut = (dispatch) => {
    GoogleSignin.currentUserAsync().then((user) => {
        // hack, need to access current user first otherwise crashes would happen
        GoogleSignin.signOut()
        .then(() => {
            // note: if somehow the app crashes after google signout but before user signed out, can be buggy
            console.tron.log("Signed Out");
            dispatch(saveUser(null, null, null));
            dispatch(SetActionCreators.clearHistory());
            dispatch(SuggestionsActionCreators.updateExerciseSuggestionsModel());
            dispatch(SuggestionsActionCreators.updateTagsSuggestionsModel());
            console.tron.log("finished saving user");
        })
        .catch((err) => {
            console.tron.log("LOGOUT SIGN OUT ERROR " + err);
        })
    })
    .catch((err) => {
        // TODO: test the play services error catch block
        console.tron.log("LOGOUT ERROR " + err);
    }).done();
};

export const signOut = () => (dispatch) => {
    executeSignOut(dispatch);
};

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

export const saveUser = (refreshToken, accessToken, email) => {
    let value = {
        type: SAVE_USER,
        accessToken: accessToken,
        refreshToken: refreshToken
    };

    if (email !== undefined) {
        value.email = email;
    }

    return value;
};

export const attemptingLogin = () => ({
    type: ATTEMPTING_LOGIN
});

export const finishedAttemptLogin = () => ({
    type: FINISHED_ATTEMPT_LOGIN
});
