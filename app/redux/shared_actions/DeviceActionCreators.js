// These exist in shared because the Bluetooth service needs access to them
// Services do not have "Actions" they're directly associated with, so they use the shared creator

import { NativeModules } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import DeviceInfo from 'react-native-device-info';

import {
    START_DEVICE_SCAN,
    STOP_DEVICE_SCAN,
    FOUND_DEVICE,
    BLUETOOTH_OFF,
    DISCONNECTED_FROM_DEVICE,
    CONNECTING_TO_DEVICE,
    CONNECTED_TO_DEVICE,
    ADD_REP_DATA,
    RECONNECTING_TO_DEVICE,
    DISCONNECT_DEVICE,
    CONNECT_DEVICE,
    RECONNECT_DEVICE
} from 'app/ActionTypes';
import * as TimerActionCreators from './TimerActionCreators';
import * as SetsActionCreators from './SetsActionCreators';
import * as ConnectedDeviceStatusSelectors from 'app/redux/selectors/ConnectedDeviceStatusSelectors';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';
import * as Analytics from 'app/utility/Analytics';

const RFDuinoLib = NativeModules.RFDuinoLib;

var connectTimeoutTimer = null;
var reconnectTimeoutTimer = null;
var reconnectTimer = null;
const clearTimers = () => {
    BackgroundTimer.clearTimeout(connectTimeoutTimer);
    BackgroundTimer.clearTimeout(reconnectTimeoutTimer);
    BackgroundTimer.clearTimeout(reconnectTimer);
    connectTimeoutTimer = null;
    reconnectTimeoutTimer = null;
    reconnectTimer = null;
};

// SCANNING

export const startDeviceScan = () => {
    RFDuinoLib.startScan();

    // analytics
    const uniqueID = DeviceInfo.getUniqueID();
    Analytics.setUserProp('mobile_identifier', uniqueID);

    return {
        type: START_DEVICE_SCAN
    };
};

export const stopDeviceScan = () => (dispatch, getState) => {
    RFDuinoLib.stopScan();

    // analytics
    const state = getState();
    const scanned_devices = state.scannedDevices.devices.join();
    const num_scanned_devices = state.scannedDevices.devices.length;
    console.tron.log(scanned_devices);
    console.tron.log(num_scanned_devices);    
    Analytics.setUserProp('scanned_devices', scanned_devices);
    Analytics.setUserProp('num_scanned_devices', num_scanned_devices);

    dispatch({
        type: STOP_DEVICE_SCAN
    });
};

export const foundDevice = (name, identifier) => {
    Analytics.setUserProp('is_bluetooth_on', true);

    return {
        type: FOUND_DEVICE,
        device: name,
        deviceIdentifier: identifier
    }
};

// DEVICE

export const connectDevice = (device) => (dispatch, getState) => {
    Analytics.setUserProp('is_bluetooth_on', true);
    RFDuinoLib.connectDevice(device);

    // HACK: ideally this is a connect timeout saga
    // but it requires both background timer and access to actions
    // therefore putting it here
    connectTimeoutTimer = BackgroundTimer.setTimeout(() => {
        // check to see if stuck connecting
        const state = getState();
        const status = ConnectedDeviceStatusSelectors.getConnectedDeviceStatus(state);
        if (status === 'CONNECTING') {
            // disconnect
            dispatch(disconnectDevice()); // in case it's trying to connect, ensure it's actually disconnecting
            dispatch(disconnectedFromDevice()); // in case it can never find it, visually update
        }
    }, 5000);

    dispatch({
        type: CONNECT_DEVICE,
        device: device
    });
};

export const reconnectDevice = (device, identifier) => (dispatch, getState) => {
    // reconnect after a second as V2s have issues
    reconnectTimer = BackgroundTimer.setTimeout(() => {
        RFDuinoLib.connectDevice(device);
    }, 2000);

    // HACK: ideally this is a connect timeout saga
    // but it requires both background timer and access to actions
    // therefore putting it here
    reconnectTimeoutTimer = BackgroundTimer.setTimeout(() => {
        // check to see if stuck connecting
        const state = getState();
        const status = ConnectedDeviceStatusSelectors.getConnectedDeviceStatus(state);
        if (status !== 'CONNECTED') {
            // disconnect
            dispatch(disconnectDevice()); // in case it's trying to connect, ensure it's actually disconnecting
            dispatch(disconnectedFromDevice(device, identifier)); // in case it can never find it, visually update and trigger another reconnect
        }
    }, 7000);

    dispatch({
        type: RECONNECT_DEVICE,
        device: device
    });
};

export const disconnectDevice = () => {
    RFDuinoLib.disconnectDevice();

    return {
        type: DISCONNECT_DEVICE
    };
};

// DEVICE STATUS

export const bluetoothIsOff = () => {
    Analytics.setUserProp('is_bluetooth_on', false);

    return {
        type: BLUETOOTH_OFF
    };
};

export const disconnectedFromDevice = (name=null, identifier=null) => {
    clearTimers();

    Analytics.setUserProp('connected_device_id', null);
    Analytics.setUserProp('is_v2', false);
    Analytics.setUserProp('is_v3', false);

    return {
        type: DISCONNECTED_FROM_DEVICE,
        device: name,
        deviceIdentifier: identifier
    };
};

export const connectingToDevice = (name, identifier) => {
    Analytics.setUserProp('is_bluetooth_on', true);
    
    return {
        type: CONNECTING_TO_DEVICE,
        device: name,
        deviceIdentifier: identifier
    };
};

export const connectedToDevice = (name, identifier) => {
    clearTimers();

    Analytics.setUserProp('connected_device_id', identifier);
    Analytics.setUserProp('is_bluetooth_on', true);

    if (name.charAt(3) === '2') {
        Analytics.setUserProp('is_v2', true);
        Analytics.setUserProp('is_v3', false);
    } else if (name.charAt(3) === '3') {
        Analytics.setUserProp('is_v3', true);
        Analytics.setUserProp('is_v2', false);
    }

    return {
        type: CONNECTED_TO_DEVICE,
        deviceName: name,
        deviceIdentifier: identifier
    };
};

export const reconnectingToDevice = (name, identifier) => {
    Analytics.setUserProp('connected_device_id', identifier);
    Analytics.setUserProp('is_bluetooth_on', true);

    if (name.charAt(3) === '2') {
        Analytics.setUserProp('is_v2', true);
        Analytics.setUserProp('is_v3', false);
    } else if (name.charAt(3) === '3') {
        Analytics.setUserProp('is_v3', true);
        Analytics.setUserProp('is_v2', false);
    }
    return {
        type: RECONNECTING_TO_DEVICE,
        deviceName: name,
        deviceIdentifier: identifier
    };
};

// DATA

export const receivedLiftData = (isValid, data, time=new Date()) => (dispatch, getState) => {
    var state = getState();
    Analytics.setUserProp('is_bluetooth_on', true);

    dispatch(TimerActionCreators.sanityCheckTimer());

    dispatch({
        type: ADD_REP_DATA,
        isValid: isValid,
        data: data,
        deviceName: state.connectedDevice.deviceName,
        deviceIdentifier: state.connectedDevice.deviceIdentifier,
        time: time
    });

    dispatch(TimerActionCreators.startEndSetTimer());
};
