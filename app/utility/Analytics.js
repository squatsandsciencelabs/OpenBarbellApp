import firebase from 'app/configs/Firebase';
import { 
    AppState
} from 'react-native';
import * as ScannedDevicesSelectors from 'app/redux/selectors/ScannedDevicesSelectors';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as ConnectedDeviceStatusSelectors from 'app/redux/selectors/ConnectedDeviceStatusSelectors';

// Screens

export const setCurrentScreen = (screen) => {
    firebase.analytics().setCurrentScreen(screen);
};

// User Properties

export const setUserProp = (name, value) => {
    firebase.analytics().setUserProperty(name, value);
};

// Log Events
// params must be an object
export const logEvent = (event, params) => {
    firebase.analytics().logEvent(event, params);
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
        params.is_app_in_backround = true;
        params.is_app_inactive = true;        
    }

    const scanned_devices = ScannedDevicesSelectors.getScannedDevices(state);
    const connectedDeviceStatus = ConnectedDeviceStatusSelectors.getConnectedDeviceStatus(state);
    const isWorkoutEmpty = SetsSelectors.getIsWorkoutEmpty(state);

    params.scanned_devices = scanned_devices.join();
        
    params.num_scanned_devices = scanned_devices.length;  
    
    if (connectedDeviceStatus !== 'BLUETOOTH_OFF') {
        params.is_bluetooth_on = true;
    } else {
        params.is_bluetooth_on = false;
    }

    params.is_workout_in_progress = !isWorkoutEmpty;
        
    console.tron.log(params);
    logEvent(event, params);
};
