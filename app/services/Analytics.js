import firebase from 'app/services/Firebase';
import {
    AppState
} from 'react-native';
import * as ScannedDevicesSelectors from 'app/redux/selectors/ScannedDevicesSelectors';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as ConnectedDeviceStatusSelectors from 'app/redux/selectors/ConnectedDeviceStatusSelectors';
import * as AppStateSelectors from 'app/redux/selectors/AppStateSelectors';
import * as SurveySelectors from 'app/redux/selectors/SurveySelectors';
import DeviceInfo from 'react-native-device-info';

//initial analytics and initial screen

export const setInitialAnalytics = () => {
    const mobileID = DeviceInfo.getUniqueId();
    // set initial user props analytics
    setUserProp('connected_device_id', null);
    setUserProp('mobile_identifier', mobileID);
    setUserProp('device_version', null);
    setCurrentScreen('settings');
};

// User ID

// user ID defaults to the mobile identifier for anonymous users
export const setUserID = (userID=DeviceInfo.getUniqueId()) => {
    firebase.app().analytics().setUserId(userID);
    firebase.crashlytics().setUserIdentifier(userID);

    console.tron.display({
        name: 'UserID',
        value: userID,
        preview: userID,
        important: true,
        image: 'https://firebase.google.com/_static/images/firebase/touchicon-180.png'
    });
};

// Screens

export const setCurrentScreen = (screen) => {
    firebase.app().analytics().setCurrentScreen(screen);

    console.tron.display({
        name: 'SetScreen',
        value: screen,
        preview: screen,
        important: true,
        image: 'https://firebase.google.com/_static/images/firebase/touchicon-180.png'
    });
};

// User Properties

export const setUserProp = (name, value) => {
    firebase.app().analytics().setUserProperty(name, value);

    console.tron.display({
        name: 'SetUserProp',
        value: value,
        preview: name + " = " + value,
        important: true,
        image: 'https://firebase.google.com/_static/images/firebase/touchicon-180.png'
    });
};

// Log Events
// params must be an object
export const logEvent = (event, params) => {
    firebase.app().analytics().logEvent(event, params);

    console.tron.display({
        name: 'LogEvent',
        value: params,
        preview: event,
        important: true,
        image: 'https://firebase.google.com/_static/images/firebase/touchicon-180.png'
    });
};

export const logEventWithAppState = (event, params, state) => {
    const screenStatus = AppStateSelectors.getScreenStatus(state);
    const currentAppState = AppState.currentState;

    // if (screenStatus === 'active') {
    //     params.is_screen_locked = false;
    // } else {
    //     params.is_screen_locked = true;
    // }

    // if (currentAppState === 'active') {
    //     params.is_app_active = true;
    //     params.is_app_in_background = false;
    //     params.is_app_inactive = false;
    // } else if (currentAppState === 'background') {
    //     params.is_app_active = false;
    //     params.is_app_in_background = true;
    //     params.is_app_inactive = false;
    // } else if (currentAppState === 'inactive') {
    //     params.is_app_active = false;
    //     params.is_app_in_background = true;
    //     params.is_app_inactive = true;        
    // }

    let devices = ScannedDevicesSelectors.getScannedDevices(state);
    if (devices.length > 25) {
        devices = devices.slice(0, 25);
    };
    const connectedDeviceStatus = ConnectedDeviceStatusSelectors.getConnectedDeviceStatus(state);
    const isWorkoutEmpty = SetsSelectors.getIsWorkoutEmpty(state);
    const isSurveyVisible = SurveySelectors.getSurveyAvailable(state);

    const scanned_devices = devices.join().replace(/\s|OB|,/g, '');
    params.scanned_devices = scanned_devices;
        
    params.num_scanned_devices = devices.length;  
    
    // params.is_bluetooth_on = connectedDeviceStatus !== 'BLUETOOTH_OFF';

    params.is_workout_in_progress = !isWorkoutEmpty;

    params.is_survey_visible = isSurveyVisible;
    
    logEvent(event, params);
};

// ERRORS
// auto adds error to the params
// auto chooses the code from the error if it exists, else defaults to 9001 as it's unknown

const addErrorToParams = (error, params) => {
    // parse error string
    if (error) {
        var errorString = JSON.stringify(error);
    } else {
        var errorString = "";
    }

    // create params
    if (params) {
        params.error = errorString;
    } else {
        params = {error: errorString};
    }

    return params;
};

const getErrorCode = (error) => {
    if (error && error.code && !isNaN(error.code)) {
        return parseInt(error.code);
    } else {
        return 9001;
    }
};

const logCrashlyticsError = (code, event, params) => {
    let message = JSON.stringify(params);
    firebase.crashlytics().setStringValue("error_params", message);
    firebase.crashlytics().recordError(code, JSON.stringify(event));
};

export const logError = (error, event, params) => {
    let errorParams = addErrorToParams(error, params);
    let errorCode = getErrorCode(error);
    logCrashlyticsError(errorCode, event, errorParams);
    logEvent(event, errorParams);
};

export const logErrorWithAppState = (error, event, params, state) => {
    let errorParams = addErrorToParams(error, params);
    let errorCode = getErrorCode(error);
    logCrashlyticsError(errorCode, event, errorParams);
    logEventWithAppState(event, errorParams, state);
};
