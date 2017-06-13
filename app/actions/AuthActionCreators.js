// app/actions/AuthActionCreators.js

import api from '../api/api';
import { GoogleSignin } from 'react-native-google-signin';
import * as SetActionCreators from './SetActionCreators';
import * as AuthActionCreators from './AuthActionCreators';
import * as SettingsActionCreators from './SettingsActionCreators';
import * as SuggestionsActionCreators from '../actions/SuggestionsActionCreators';
import { SAVE_USER, ATTEMPTING_LOGIN, FINISHED_ATTEMPT_LOGIN } from '../ActionTypes';
import { Alert, Platform } from 'react-native';

// TODO: split this large function up into smaller pieces to be more testable
// TODO: consolidate google sign in code somehow

export const signIn = () => (dispatch) => {
	console.log("Attempting sign in");
	dispatch(attemptingLogin());

	GoogleSignin.signIn().then((user) => {
		console.log("sign in complete! attempt to login from api!");
		// TODO: make this another ApiActionCreator thunk instead of accessing the API directly
		// TODO: success code here might need to reflect sync success code as well to reduce errors
		api.login(user.idToken, dispatch, (accessToken, refreshToken, revision, sets) => {
			console.log("auth action creator now has " + accessToken + " " + refreshToken + " " + JSON.stringify(sets));
			dispatch(AuthActionCreators.saveUser(refreshToken, accessToken, user.email));
			dispatch(SetActionCreators.updateSetDataFromServer(revision, sets));
			dispatch(SettingsActionCreators.updateSyncDate(new Date()));
			dispatch(SuggestionsActionCreators.updateExerciseSuggestionsModel());
			dispatch(finishedAttemptLogin());
		}, (err) => {
			// API login error, means we need to sign out of the google account as well
			console.log('API Login Error ', err);
			executeSignOut(dispatch);
			dispatch(finishedAttemptLogin());
			showGenericAlert();
		});
	}).catch((err) => {
		// Can happen if the internet is weird and google play services can't be accessed properly
		// Can happen when the user just doesn't pick one
		// Either way, the sign in failed so you do NOT have to execute a sign out
		console.log('WRONG SIGNIN', err);
		dispatch(finishedAttemptLogin());
		if (err.code !== -5) { // -5 is the error for user canceling the sign in
			showGenericAlert();
		}
	})
	.done();
};

const executeSignOut = (dispatch) => {
	console.log("executing sign out");

	GoogleSignin.currentUserAsync().then((user) => {
		// hack, need to access current user first otherwise crashes would happen
		GoogleSignin.signOut()
		.then(() => {
			// note: if somehow the app crashes after google signout but before user signed out, can be buggy
			console.log("Signed Out");
			dispatch(saveUser(null, null, null));
			dispatch(SetActionCreators.clearHistory());
			dispatch(SuggestionsActionCreators.updateExerciseSuggestionsModel());
			console.log("finished saving user");
		})
		.catch((err) => {
			console.log("LOGOUT SIGN OUT ERROR " + err);
		})
	})
	.catch((err) => {
		// TODO: test the play services error catch block
		console.log("LOGOUT ERROR " + err);
	}).done();
};

export const signOut = () => (dispatch) => {
	console.log("signing out");
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
