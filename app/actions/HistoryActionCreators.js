// app/actions/HistoryActionCreators.js

import {
	EDIT_HISTORY_SET,
	END_EDIT_HISTORY_SET,
	UPDATE_HISTORY_FILTER,
} from '../ActionTypes';
import * as GoogleDriveUploader from '../utility/GoogleDriveUploader';
import * as CSVConverter from '../utility/CSVConverter';
import { getHistorySetsChronological } from '../reducers/SetReducer';

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
	.then(GoogleSignin.currentUserAsync().then(async (user) => {
		if (user === null) {
			Alert.alert('This feature is only available for logged in users. Please sign in via Settings.\n\nIf you are signed in, this may be a bug. Please logout and login again.');
		} else {
			try {
				let date = new Date();
				let name = 'OpenBarbell Data -- Exported on ' + date.toLocaleString() + '.csv';
				let state = getState();
				let sets = getHistorySetsChronological(state.sets);
				let csv = CSVConverter.convert(sets);
				await GoogleDriveUploader.upload(user.accessToken, name, csv);
				Alert.alert('CSV uploaded to your Google Drive! Please check it out there.');
			} catch(err) {
				console.log("Error uploading csv file " + typeof err + " " + err);
				if (err.message == 'Insufficient Permission') { // TODO: should do typeof check but it's not working
					Alert.alert('Please log out and log in again. This feature requires additional Google Drive permissions.');
				} else {
					Alert.alert('Error exporting CSV. Please try again later.');
				}
			}
		}
	}))
	.catch((err) => {
		console.log("EXPORT HISTORY ERROR " + err);
	})
	.done();
};
