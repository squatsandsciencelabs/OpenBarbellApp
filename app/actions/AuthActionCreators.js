// app/actions/AuthActionCreators.js

import api from '../api/api';
import { GoogleSignin } from 'react-native-google-signin';
import * as SetActionCreators from './SetActionCreators';
import * as AuthActionCreators from './AuthActionCreators';
import config from '../config.json';
import { SAVE_USER, ATTEMPTING_LOGIN, FINISHED_ATTEMPT_LOGIN } from '../ActionTypes';
import { Alert, Platform } from 'react-native';

// TODO: split this large function up into smaller pieces to be more testable

export const signIn = () => (dispatch) => {
	console.log("SIGN IN ATTEMPT");

	dispatch(attemptingLogin());

	console.log("has play services check!");

	// 1. check google play services
	GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
		console.log("has!!!! attempting to configure!");

		// 2. configure things
		GoogleSignin.configure({
			iosClientId: config.iOSGoogleClientID,
			webClientId: config.webGoogleClientID
		}).then(() => {
			console.log("configured! showing sign in modal now!!!");
			// 3. show sign in modal
			GoogleSignin.signIn()
				.then((user) => {
					console.log("sign in complete! attempt to login from api!");
					// 4. send the token to the server
					// TODO: make this another ApiActionCreator thunk instead of accessing the API directly
					api.login(user.idToken, dispatch, (accessToken, refreshToken, revision, sets) => {
						console.log("auth action creator now has " + accessToken + " " + refreshToken + " " + JSON.stringify(sets));
						// 5. save all the datas

						dispatch(AuthActionCreators.saveUser(refreshToken, accessToken, user.email));
						dispatch(SetActionCreators.updateSetDataFromServer(revision, sets));
						dispatch(finishedAttemptLogin());
					}, (err) => {
						// API login error, means we need to sign out of the google account as well
						console.log('API Login Error ', err);
						executeSignOut(dispatch);
						dispatch(finishedAttemptLogin());
						showGenericAlert();
					});
				})
				.catch((err) => {
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
		});
	})
	.catch((err) => {
		console.log("Play services error", err.code, err.message);
		dispatch(finishedAttemptLogin());
		alert("Play Services Error", err.mesage);
	})
};

const executeSignOut = (dispatch) => {
	console.log("executing sign out");

	// hack
	// just copy pasting the setup code, ideally should have 1 location for it but going for speed right now
	GoogleSignin.hasPlayServices({ autoResolve: true })
	.then(() => {
		console.log("Has play services! configuring");
		GoogleSignin.configure({
			iosClientId: config.iOSGoogleClientID,
			webClientId: config.webGoogleClientID
		})
		.then(() => {
			console.log("Finished configuring! attempting to sign out now");
			GoogleSignin.currentUserAsync()
			.then((user) => {
				GoogleSignin.signOut()
				.then(() => {
					console.log("Signed Out");
					dispatch(saveUser(null, null, null));
					console.log("finished saving user");
					// should be fine at this point...there isn't something i really need to do here
				})
				.catch((err) => {
					console.log("LOGOUT SIGN OUT ERROR " + err);
				})
				.done();
			})
			.catch((err) => {
				console.log("LOGOUT CURRENT USER ASYNC ERROR " + err);
			})
		})
		.catch((err) => {
			// according to the docs, this should be impossible to reach
			console.log("LOGOUT CONFIGURE ERROR " + err);
		})
	})
	.catch((err) => {
		// according to the docs, this should be impossible to reach
		console.log("LOGOUT PLAY SERVICES ERROR " + err);
	});
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
