import { Alert, Linking } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';

import {
    UPDATE_HISTORY_FILTER,
    EXPORTING_CSV
} from 'app/ActionTypes';

import * as GoogleDriveUploader from 'app/services/GoogleDriveUploader';
import * as CSVConverter from 'app/utility/transforms/CSVConverter';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

export const showRemovedData = () => ({
    type: UPDATE_HISTORY_FILTER,
    showRemoved: true
});

export const hideRemovedData = () => ({
    type: UPDATE_HISTORY_FILTER,
    showRemoved: false
});

// TODO: refactor this into a saga
export const exportCSV = () => (dispatch, getState) => {
    // logged in check
    let state = getState();
    if (state.auth.email === null) {
        Alert.alert('Sign in Required', 'Please sign in via Settings to use this feature.');
        return;
    }

    GoogleSignin.currentUserAsync().then(async (user) => {
        if (user === null) {
            Alert.alert('Error Exporting CSV', 'Tip: Is your internet connection working?\n\nTip: Try Logging out then logging in again as this feature requires additional Google Drive permissions.');
        } else {
            dispatch(updateIsExportingCSV(true));
            try {
                let date = new Date();
                let name = 'OpenBarbell Data -- Exported on ' + date.toLocaleString() + '.csv';
                // TODO: use a more efficient method of generating the name, perhaps an actual date format
                name = name.split('/').join('-');
                name = name.split(',').join('');
                name = name.split(':').join('.');
                let state = getState();
                let sets = SetsSelectors.getHistorySetsChronological(state.sets);
                let csv = CSVConverter.convert(sets);
                console.tron.log("google access token " + user.accessToken);
                await GoogleDriveUploader.upload(user.accessToken, name, csv, (fileID) => {
                    dispatch(updateIsExportingCSV(false));
                    Linking.openURL('https://drive.google.com/open?id=' + fileID).catch(err => {
                        Alert.alert('Upload Succeeded', 'CSV uploaded to your Google Drive!');
                    });
                });
            } catch(err) {
                console.tron.log("Error uploading csv file " + typeof err + " " + err);
                if (err.message == 'Insufficient Permission') { // TODO: should do typeof check but it's not working
                    Alert.alert('Google Drive Permissions Error', 'Please log out and log in again. This feature requires additional Google Drive permissions.');
                } else {
                    Alert.alert('Error exporting CSV', 'Please try again later.\n\nTip: Is your internet connection working?');
                }
                dispatch(updateIsExportingCSV(false));
            }
        }
    })
    .catch((err) => {
        console.tron.log("EXPORT HISTORY ERROR " + err);
    })
    .done();
};

const updateIsExportingCSV = (isExportingCSV) => ({ type: EXPORTING_CSV, isExportingCSV: isExportingCSV });

