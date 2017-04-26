// app/actions/HistoryActionCreators.js

import {
	EDIT_HISTORY_SET,
	END_EDIT_HISTORY_SET,
	UPDATE_HISTORY_FILTER,
} from '../ActionTypes';

import { GoogleSignin } from 'react-native-google-signin';
import config from '../config.json';

export const editHistorySet = (setID) => ({ type: EDIT_HISTORY_SET, setID: setID });

export const endEditHistorySet = () => ({ type: END_EDIT_HISTORY_SET });

export const showRemovedData = () => ({ type: UPDATE_HISTORY_FILTER, showRemoved: true });

export const hideRemovedData = () => ({ type: UPDATE_HISTORY_FILTER, showRemoved: false });

export const exportHistoryCSV = () => (dispatch, getState) => {
	GoogleSignin.hasPlayServices({ autoResolve: true })
	.then(GoogleSignin.configure({
		scopes: ["https://www.googleapis.com/auth/drive"],
		iosClientId: config.iOSGoogleClientID,
		webClientId: config.webGoogleClientID
	}))
	.then(GoogleSignin.currentUserAsync().then((user) => {
		console.log('USER', user);
		console.log('access token: ' + user.accessToken);
	}))
	.catch((err) => {
		console.log("EXPORT HISTORY ERROR " + err);
	})
	.done();
};
