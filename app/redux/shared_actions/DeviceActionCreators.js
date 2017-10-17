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
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
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

export const bluetoothIsOff = () => ({
    type: BLUETOOTH_OFF
});

export const disconnectedFromDevice = (name=null, identifier=null) => {
    clearTimers();

    Analytics.setUserProp('connected_device_id', null);
    Analytics.setUserProp('device_version', null);

    return {
        type: DISCONNECTED_FROM_DEVICE,
        device: name,
        deviceIdentifier: identifier
    };
};

export const connectingToDevice = (name, identifier) => ({
    type: CONNECTING_TO_DEVICE,
    device: name,
    deviceIdentifier: identifier
});

export const connectedToDevice = (name, identifier) => {
    clearTimers();
    const id = identifier.toString();
    Analytics.setUserProp('connected_device_id', id);

    checkOBVersion(name);
    
    return {
        type: CONNECTED_TO_DEVICE,
        deviceName: name,
        deviceIdentifier: identifier
    };
};

export const reconnectingToDevice = (name, identifier) => {
    const id = identifier.toString();
    Analytics.setUserProp('connected_device_id', id);

    checkOBVersion(name);

    return {
        type: RECONNECTING_TO_DEVICE,
        deviceName: name,
        deviceIdentifier: identifier
    };
};

// DATA

export const receivedLiftData = (isValid, data, time=new Date()) => (dispatch, getState) => {
    var state = getState();

    logAnalytics(state);

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

const logAnalytics = (state) => {
    let currentSet = SetsSelectors.getCurrentSet(state);
    let set_id = currentSet.set_id;
    let rep_count = currentSet.reps.length;
    let has_exercise_name = Boolean(currentSet.exercise);
    let has_weight = Boolean(currentSet.weight);
    let has_rpe = Boolean(currentSet.rpe);
    let has_tags = Boolean(currentSet.tags.length);
    let has_video = Boolean(currentSet.videoFileUrl);
    let end_set_time_left = SettingsSelectors.endSetTimeLeft(state);

    Analytics.logEventWithAppState('add_rep', {
        set_id,
        rep_count,
        has_exercise_name,
        has_weight,
        has_rpe,
        has_tags,
        has_video,
        has_reps,
        end_set_time_left,
    })
}

function checkOBVersion(name) {
    if (name.charAt(3) === '1') {
        Analytics.setUserProp('device_version', 'v1')
    } else if (name.charAt(3) === '2') {
        Analytics.setUserProp('device_version', 'v2');
    } else if (name.charAt(3) === '3') {
        Analytics.setUserProp('device_version', 'v3');
    }    
};
