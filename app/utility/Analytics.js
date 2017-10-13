import firebase from 'app/configs/Firebase';
import {
    AppState
} from 'react-native';
import * as ScannedDevicesSelectors from 'app/redux/selectors/ScannedDevicesSelectors';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as ConnectedDeviceStatusSelectors from 'app/redux/selectors/ConnectedDeviceStatusSelectors';
import DeviceInfo from 'react-native-device-info';

//initial analytics and initial screen

export const setInitialAnalytics = () => {
    const mobileID = DeviceInfo.getUniqueID();
    // set initial user props analytics
    setUserProp('connected_device_id', null);
    setUserProp('mobile_identifier', mobileID);
    setUserProp('device_version', null);    
    setCurrentScreen('settings');
};

// Screens

export const setCurrentScreen = (screen) => {
    firebase.analytics().setCurrentScreen(screen);

    console.tron.display({
        name: 'SetScreen',
        value: screen,
        preview: screen,
        important: true,
        image: 'https://firebase.google.com/_static/images/firebase/touchicon-180.png'
    })
};

// User Properties

export const setUserProp = (name, value) => {
    firebase.analytics().setUserProperty(name, value);

    console.tron.display({
        name: 'SetUserProp',
        value: value,
        preview: name + " = " + value,
        important: true,
        image: 'https://firebase.google.com/_static/images/firebase/touchicon-180.png'
    })    
};

// Log Events
// params must be an object
export const logEvent = (event, params) => {
    firebase.analytics().logEvent(event, params);

    console.tron.display({
        name: 'LogEvent',
        value: params,
        preview: event,
        important: true,
        image: 'https://firebase.google.com/_static/images/firebase/touchicon-180.png'
    })    
};

export const logEventWithAppState = (event, params, state) => {
    const screenStatus = state.appState.screenStatus;
    const currentAppState = AppState.currentState;

    // update screen_locked with state

    if (screenStatus === 'active') {
        params.is_screen_locked = false;
    } else {
        params.is_screen_locked = true;
    }

    if (currentAppState === 'active') {
        params.is_app_active = true;
        params.is_app_in_background = false;
        params.is_app_inactive = false;
    } else if (currentAppState === 'background') {
        params.is_app_active = false;
        params.is_app_in_background = true;
        params.is_app_inactive = false;
    } else if (currentAppState === 'inactive') {
        params.is_app_active = false;
        params.is_app_in_background = true;
        params.is_app_inactive = true;        
    }

    const devices = ScannedDevicesSelectors.getScannedDevices(state);
    const connectedDeviceStatus = ConnectedDeviceStatusSelectors.getConnectedDeviceStatus(state);
    const isWorkoutEmpty = SetsSelectors.getIsWorkoutEmpty(state);
    const scanned_devices = devices.join().replace(/\s|OB/g, '')

    params.scanned_devices = scanned_devices;
        
    params.num_scanned_devices = devices.length;  
    
    params.is_bluetooth_on = connectedDeviceStatus !== 'BLUETOOTH_OFF';

    params.is_workout_in_progress = !isWorkoutEmpty;
    
    logEvent(event, params);
};
