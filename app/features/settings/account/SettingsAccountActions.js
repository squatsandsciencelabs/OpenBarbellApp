import { Alert, Linking } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import * as Analytics from 'app/utility/Analytics';

import {
    LOGIN_REQUEST,
    UPDATE_HISTORY_FILTER,
    ATTEMPT_EXPORTING_CSV,
    EXPORTING_CSV
} from 'app/ActionTypes';
import * as AuthActionCreators from 'app/redux/shared_actions/AuthActionCreators';
import * as GoogleDriveUploader from 'app/services/GoogleDriveUploader';
import * as CSVConverter from 'app/utility/transforms/CSVConverter';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';

export const signIn = () => ({ type: LOGIN_REQUEST });

export const signOut = () => {
    return AuthActionCreators.logout();
};

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
            dispatch({ type: EXPORTING_CSV_ERROR });
            Alert.alert('Error Exporting CSV', 'Tip: Is your internet connection working?\n\nTip: Try Logging out then logging in again as this feature requires additional Google Drive permissions.');
        } else {
            //ATTEMPT
            logAttemptExportCSVAnalytics(state);
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
                    exportCSVAnalytics(state);
                });
            } catch(err) {
                console.tron.log("Error uploading csv file " + typeof err + " " + err);
                if (err.message == 'Insufficient Permission') { // TODO: should do typeof check but it's not working
                    Alert.alert('Google Drive Permissions Error', 'Please log out and log in again. This feature requires additional Google Drive permissions.');
                } else {
                    Alert.alert('Error exporting CSV', 'Please try again later.\n\nTip: Is your internet connection working?');
                }
                dispatch(updateIsExportingCSV(false));
                let state = getState();
                exportCSVErrorAnalytics(state);
            }
        }
    })
    .catch((err) => {
        // error here
        console.tron.log("EXPORT HISTORY ERROR " + err);
    })
    .done();
};

const updateIsExportingCSV = (isExportingCSV) => ({ type: EXPORTING_CSV, isExportingCSV: isExportingCSV });

const logAttemptExportCSVAnalytics = (state) => {
    let sets = SetsSelectors.getHistorySetsChronological(state);
    let num_reps = SetsSelectors.getHistoryReps(state);
    let workoutIDs = SetsSelectors.getHistoryWorkoutIDs(state);
    let time_since_last_export = getLastExportCSV(state);
    let time_since_last_workout = SetsSelectors.lastWorkoutTime(state);

    Analytics.logEventWithAppState('attempt_export_csv', {
        value: time_since_last_export,
        num_sets: sets.length,
        num_reps: num_reps,
        num_workouts: workoutIDs.length,
        time_since_last_workout: time_since_last_workout,
        time_since_last_export: time_since_last_export,
    }, state);    
};

const exportCSVAnalytics = (state) => {
    let sets = SetsSelectors.getHistorySetsChronological(state);
    let num_reps = SetsSelectors.getHistoryReps(state);
    let workoutIDs = SetsSelectors.getHistoryWorkoutIDs(state);
    let time_since_last_export = getLastExportCSV(state);
    let time_since_last_workout = SetsSelectors.lastWorkoutTime(state);

    Analytics.logEventWithAppState('export_csv', {
        value: time_since_last_export,
        num_sets: sets.length,
        num_reps: num_reps,
        num_workouts: workoutIDs.length,
        time_since_last_workout: time_since_last_workout,
        time_since_last_export: time_since_last_export,
    }, state);    
};

const exportCSVErrorAnalytics = (state) => {
    let sets = SetsSelectors.getHistorySetsChronological(state);
    let num_reps = SetsSelectors.getHistoryReps(state);
    let workoutIDs = SetsSelectors.getHistoryWorkoutIDs(state);
    let time_since_last_export = getLastExportCSV(state);
    let time_since_last_workout = SetsSelectors.lastWorkoutTime(state);

    Analytics.logEventWithAppState('export_csv_error', {
        num_sets: sets.length,
        num_reps: num_reps,
        num_workouts: workoutIDs.length,
        time_since_last_workout: time_since_last_workout,
        time_since_last_export: time_since_last_export,
    }, state);    
};

const getLastExportCSV = (state) => {
    let startDate = SettingsSelectors.getLastExportCSV(state);
    if (Boolean(startDate)) {
        return Math.abs((new Date()).getTime() - startDate.getTime());
    } else {
        return 0;
    }
};
