// app/actions/HistoryActionCreators.js

import {
	EDIT_HISTORY_SET,
	END_EDIT_HISTORY_SET,
	UPDATE_HISTORY_FILTER,
} from '../ActionTypes';
import * as GoogleDriveUploader from '../utility/GoogleDriveUploader';

import { Alert } from 'react-native'
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
		try {
			let date = new Date();
			let name = 'OpenBarbell Data -- Exported on ' + date.toString() + '.csv';
			GoogleDriveUploader.upload(user.accessToken, name, 'fuck,you\nfoo,bar');
			Alert.alert('CSV uploaded to your Google Drive! Please check it out there.');
		} catch(err) {
			console.log("Error uploading csv file " + err);
			Alert.alert('There was an error exporting you CSV file. Please try again later.');
		}
	}))
	.catch((err) => {
		console.log("EXPORT HISTORY ERROR " + err);
	})
	.done();
};
