// app/actions/DeviceActionCreators.js

import {
    CONNECT_DEVICE,
    DISCONNECT_DEVICE,
    START_DEVICE_SCAN,
    STOP_DEVICE_SCAN,
    FOUND_DEVICE,
	BLUETOOTH_OFF,
	DISCONNECTED_FROM_DEVICE,
	CONNECTING_TO_DEVICE,
	CONNECTED_TO_DEVICE,
	ADD_REP_DATA
} from '../ActionTypes';

import * as TimerActionCreators from './TimerActionCreators';

import { NativeModules } from 'react-native';
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

// CONNECTION

export const connectDevice = (device) => {
    RFDuinoLib.connectDevice(device);

    return {
        type: CONNECT_DEVICE,
        device: device
    };
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

export const disconnectedFromDevice = () => ({
    type: DISCONNECTED_FROM_DEVICE
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

// DATA

export const receivedLiftData = (isValid, data) => (dispatch, getState) => {
    var state = getState();

    dispatch({
        type: ADD_REP_DATA,
        isValid: isValid,
        data: data,
        deviceName: state.connectedDevice.deviceName,
        deviceIdentifier: state.connectedDevice.deviceIdentifier,
    });

    dispatch(TimerActionCreators.startEndSetTimer());
};
