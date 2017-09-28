// These exist in shared because the Bluetooth service needs access to them
// Services do not have "Actions" they're directly associated with, so they use the shared creator

import { NativeModules } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

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
import * as ConnectedDeviceStatusSelectors from 'app/redux/selectors/ConnectedDeviceStatusSelectors';

const RFDuinoLib = NativeModules.RFDuinoLib;

// SCANNING

export const startDeviceScan = () => {
    RFDuinoLib.startScan();

    return {
        type: START_DEVICE_SCAN
    };
};

export const stopDeviceScan = () => {
    RFDuinoLib.stopScan();

    return {
        type: STOP_DEVICE_SCAN
    };
};

export const foundDevice = (name, identifier) => ({
    type: FOUND_DEVICE,
    device: name,
    deviceIdentifier: identifier
});

// DEVICE

export const connectDevice = (device) => (dispatch, getState) => {
    RFDuinoLib.connectDevice(device);

    // HACK: ideally this is a connect timeout saga
    // but it requires both background timer and access to actions
    // therefore putting it here
    BackgroundTimer.setTimeout(() => {
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
    // reconnect after a second
    BackgroundTimer.setTimeout(() => {
        RFDuinoLib.connectDevice(device);
    }, 1000);

    // HACK: ideally this is a connect timeout saga
    // but it requires both background timer and access to actions
    // therefore putting it here
    BackgroundTimer.setTimeout(() => {
        // check to see if stuck connecting
        const state = getState();
        const status = ConnectedDeviceStatusSelectors.getConnectedDeviceStatus(state);
        if (status !== 'CONNECTED') {
            // disconnect
            dispatch(disconnectDevice()); // in case it's trying to connect, ensure it's actually disconnecting
            dispatch(disconnectedFromDevice(device, identifier)); // in case it can never find it, visually update and trigger another reconnect
        }
    }, 6000);

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

export const bluetoothIsOff = () => ({
    type: BLUETOOTH_OFF
});

export const disconnectedFromDevice = (name=null, identifier=null) => ({
    type: DISCONNECTED_FROM_DEVICE,
    device: name,
    deviceIdentifier: identifier
});

export const connectingToDevice = (name, identifier) => ({
    type: CONNECTING_TO_DEVICE,
    device: name,
    deviceIdentifier: identifier
});

export const connectedToDevice = (name, identifier) => ({
    type: CONNECTED_TO_DEVICE,
    deviceName: name,
    deviceIdentifier: identifier
});

export const reconnectingToDevice = () => ({
    type: RECONNECTING_TO_DEVICE,
});

// DATA

export const receivedLiftData = (isValid, data, time=new Date()) => (dispatch, getState) => {
    var state = getState();

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
