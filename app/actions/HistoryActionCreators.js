// app/actions/HistoryActionCreators.js

import {
	EDIT_HISTORY_SET,
	END_EDIT_HISTORY_SET,
	UPDATE_HISTORY_FILTER,
	EXPORTING_CSV
} from '../ActionTypes';
import * as GoogleDriveUploader from '../utility/GoogleDriveUploader';
import * as CSVConverter from '../utility/CSVConverter';
import { getHistorySetsChronological } from '../reducers/SetReducer';

import { Alert, Linking } from 'react-native'
import { GoogleSignin } from 'react-native-google-signin';

export const editHistorySet = (setID) => ({ type: EDIT_HISTORY_SET, setID: setID });

export const endEditHistorySet = () => ({ type: END_EDIT_HISTORY_SET });

export const showRemovedData = () => ({ type: UPDATE_HISTORY_FILTER, showRemoved: true });

export const hideRemovedData = () => ({ type: UPDATE_HISTORY_FILTER, showRemoved: false });

const updateIsExportingCSV = (isExportingCSV) => ({ type: EXPORTING_CSV, isExportingCSV: isExportingCSV });

export const exportHistoryCSV = () => (dispatch, getState) => {
	GoogleSignin.currentUserAsync().then(async (user) => {
		if (user === null) {
			Alert.alert('Error', 'This feature is only available for logged in users. Please sign in via Settings.\n\nIf you are actually signed in, please logout and login again.');
		} else {
			dispatch(updateIsExportingCSV(true));
			try {
				let date = new Date();
				let name = 'OpenBarbell Data -- Exported on ' + date.toLocaleString() + '.csv';
				let state = getState();
				let sets = getHistorySetsChronological(state.sets);
				let csv = CSVConverter.convert(sets);
				console.log("google access token " + user.accessToken);
				GoogleDriveUploader.upload(user.accessToken, name, csv, (fileID) => {
					dispatch(updateIsExportingCSV(false));
					Linking.openURL('https://drive.google.com/open?id=' + fileID).catch(err => {
						Alert.alert('Upload Succeeded', 'CSV uploaded to your Google Drive!');
					});
				});
			} catch(err) {
				console.log("Error uploading csv file " + typeof err + " " + err);
				if (err.message == 'Insufficient Permission') { // TODO: should do typeof check but it's not working
					Alert.alert('Error', 'Please log out and log in again. This feature requires additional Google Drive permissions.');
				} else {
					Alert.alert('Error', 'Error exporting CSV. Please try again later.\n\nTip: Is your internet connection working?');
				}
				dispatch(updateIsExportingCSV(false));
			}
		}
	})
	.catch((err) => {
		console.log("EXPORT HISTORY ERROR " + err);
	})
	.done();
};
