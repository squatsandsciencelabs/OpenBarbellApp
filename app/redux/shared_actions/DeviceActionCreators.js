// These exist in shared because the Bluetooth service needs access to them
// Services do not have "Actions" they're directly associated with, so they use the shared creator

import { NativeModules } from 'react-native';

import {
    FOUND_DEVICE,
    BLUETOOTH_OFF,
    DISCONNECTED_FROM_DEVICE,
    CONNECTING_TO_DEVICE,
    CONNECTED_TO_DEVICE,
    ADD_REP_DATA
} from 'app/ActionTypes';
import * as TimerActionCreators from './TimerActionCreators';

const RFDuinoLib = NativeModules.RFDuinoLib;

// SCANNING

export const foundDevice = (name, identifier) => ({
    type: FOUND_DEVICE,
    device: name,
    deviceIdentifier: identifier
});

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
