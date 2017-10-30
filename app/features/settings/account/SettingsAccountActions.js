import { Alert, Linking } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';

import {
    LOGIN_REQUEST,
    UPDATE_HISTORY_FILTER,
    ATTEMPT_EXPORTING_CSV,
    EXPORTING_CSV,
    CANCEL_LOGOUT,
} from 'app/ActionTypes';
import * as AuthActionCreators from 'app/redux/shared_actions/AuthActionCreators';
import * as GoogleDriveUploader from 'app/services/GoogleDriveUploader';
import * as CSVConverter from 'app/utility/transforms/CSVConverter';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';
import * as DurationCalculator from 'app/utility/transforms/DurationCalculator';
import * as Analytics from 'app/services/Analytics';

export const signIn = () => (dispatch, getState) => {
    const state = getState();
    logTapGoogleSignInAnalytics(state);

    dispatch({
        type: LOGIN_REQUEST 
    });
};

export const signOut = () => (dispatch, getState) => {
    const state = getState();
    logAttemptLogoutAnalytics(state);
    
    dispatch(AuthActionCreators.logout());
};

export const cancelSignOut = () => (dispatch, getState) => {
    const state = getState();
    logLogoutCancelledAnalytics(state);

    dispatch({
        type: CANCEL_LOGOUT
    });
};

export const showRemovedData = () => (dispatch, getState) => {
    const state = getState();
    logShowDeletedAnalytics(state);

    dispatch({
        type: UPDATE_HISTORY_FILTER,
        showRemoved: true,
    });
};

export const hideRemovedData = () => (dispatch, getState) => {
    const state = getState();
    logHideDeletedAnalytics(state);

    dispatch({
        type: UPDATE_HISTORY_FILTER,
        showRemoved: false
    });
};

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
            logAttemptCSVAnalytics(state);
            dispatch(updateIsExportingCSV(true));
            try {
                let date = new Date();
                let name = 'OpenBarbell Data -- Exported on ' + date.toLocaleString() + '.csv';
                // TODO: use a more efficient method of generating the name, perhaps an actual date format
                name = name.split('/').join('-');
                name = name.split(',').join('');
                name = name.split(':').join('.');
                let state = getState();
                let sets = SetsSelectors.getHistorySetsChronological(state);
                let csv = CSVConverter.convert(sets);
                console.tron.log("google access token " + user.accessToken);
                await GoogleDriveUploader.upload(user.accessToken, name, csv, (fileID) => {
                    dispatch(updateIsExportingCSV(false));
                    Linking.openURL('https://drive.google.com/open?id=' + fileID).catch(err => {
                        Alert.alert('Upload Succeeded', 'CSV uploaded to your Google Drive!');
                    });
                    logExportCSVAnalytics(state);
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
                logExportCSVErrorAnalytics(state);
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

const getTimeSinceLastExport = (state) => {
    const startDate = SettingsSelectors.getLastExportCSVDate(state);
    if (Boolean(startDate)) {
        return Date.parse(new Date()) - Date.parse(startDate);
    } else {
        return 0;
    }
};

// ANALYTICS

const logTapGoogleSignInAnalytics = (state) => {
    Analytics.logEventWithAppState('tap_google_sign_in', {
    }, state);    
};

const logAttemptCSVAnalytics = (state) => {
    const num_sets = SetsSelectors.getNumHistorySets(state);
    const num_reps = SetsSelectors.getNumHistoryReps(state);
    const num_workouts = SetsSelectors.getNumHistoryWorkouts(state);
    const time_since_last_export = getTimeSinceLastExport(state);
    const time_since_last_workout = SetsSelectors.getTimeSinceLastWorkout(state);

    Analytics.logEventWithAppState('attempt_export_csv', {
        value: time_since_last_export,
        num_sets: num_sets,
        num_reps: num_reps,
        num_workouts: num_workouts,
        time_since_last_workout: time_since_last_workout,
        time_since_last_export: time_since_last_export,
    }, state);
};

const logExportCSVAnalytics = (state) => {
    const num_sets = SetsSelectors.getNumHistorySets(state);
    const num_reps = SetsSelectors.getNumHistoryReps(state);
    const num_workouts = SetsSelectors.getNumHistoryWorkouts(state);
    const time_since_last_export = getTimeSinceLastExport(state);
    const time_since_last_workout = SetsSelectors.getTimeSinceLastWorkout(state);

    Analytics.logEventWithAppState('export_csv', {
        value: time_since_last_export,
        num_sets: num_sets,
        num_reps: num_reps,
        num_workouts: num_workouts,
        time_since_last_workout: time_since_last_workout,
        time_since_last_export: time_since_last_export,
    }, state);
};

const logExportCSVErrorAnalytics = (state) => {
    const num_sets = SetsSelectors.getNumHistorySets(state);
    const num_reps = SetsSelectors.getNumHistoryReps(state);
    const num_workouts = SetsSelectors.getNumHistoryWorkouts(state);
    const time_since_last_export = getTimeSinceLastExport(state);
    const time_since_last_workout = SetsSelectors.getTimeSinceLastWorkout(state);

    Analytics.logEventWithAppState('export_csv_error', {
        num_sets: num_sets,
        num_reps: num_reps,
        num_workouts: num_workouts,
        time_since_last_workout: time_since_last_workout,
        time_since_last_export: time_since_last_export,
    }, state);
};

const logAttemptLogoutAnalytics = (state) => {
    Analytics.logEventWithAppState('attempt_logout', {
    }, state);
};

const logLogoutCancelledAnalytics = (state) => {
    Analytics.logEventWithAppState('logout_cancelled', {
    }, state);
};

const logShowDeletedAnalytics = (state) => {
    Analytics.logEventWithAppState('show_deleted', {
    }, state);
};

const logHideDeletedAnalytics = (state) => {
    Analytics.logEventWithAppState('hide_deleted', {
    }, state);
};
