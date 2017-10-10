import firebase from 'app/configs/Firebase';
import { 
    AppState, 
    NetInfo 
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
    const currentAppState = AppState.currentState;

    if (currentAppState === 'active') {
        params.is_screen_locked = false;
        params.is_app_active = true;
        params.is_app_in_background = false;
        params.is_app_inactive = false;
    } else if (currentAppState === 'background') {
        params.is_screen_locked = false;
        params.is_app_active = false;
        params.is_app_in_backtround = true;
        params.is_app_inactive = false;
    } else if (currentAppState === 'inactive') {
        params.is_screen_locked = false;
        params.is_app_active = false;
        params.is_app_in_backtround = true;
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

    // NetInfo will only log these on change, need to figure out how to avoid this
    NetInfo.addEventListener('change', (networkType) => {        
        addNetworkType(networkType);
    }); 

    const addNetworkType = (networkType) => {
        if (networkType === 'wifi') {
            params = Object.assign({ 
                is_connected_to_internet: true,
                is_connected_to_wifi: true,
                is_connected_to_cell: false,             
                is_connected_to: networkType 
            }, params); 
        } else if (networkType === 'cell') {
            params = Object.assign({ 
                is_connected_to_internet: true,
                is_connected_to_wifi: false,
                is_connected_to_cell: true,             
                is_connected_to: networkType 
            }, params); 
        } else {
            params = Object.assign({ 
                is_connected_to_internet: false,
                is_connected_to_wifi: false,
                is_connected_to_cell: false,             
                is_connected_to: networkType 
            }, params);    
        } 
        
        console.tron.log(params);
        logEvent(event, params);
    }    
};
