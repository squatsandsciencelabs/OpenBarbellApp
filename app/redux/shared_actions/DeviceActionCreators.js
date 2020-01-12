// These exist in shared because the Bluetooth service needs access to them
// Services do not have "Actions" they're directly associated with, so they use the shared creator

import { NativeModules } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import BleManager  from 'react-native-ble-manager';

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
    RECONNECT_DEVICE,
    VELOCITY_DROPPED,
} from 'app/configs+constants/ActionTypes';
import * as TimerActionCreators from './TimerActionCreators';
import * as ConnectedDeviceStatusSelectors from 'app/redux/selectors/ConnectedDeviceStatusSelectors';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as Analytics from 'app/services/Analytics';
import * as ScannedDevicesSelectors from 'app/redux/selectors/ScannedDevicesSelectors';

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

export const startDeviceScan = (isManualScan = false) => (dispatch, getState) => {
    BleManager.scan(['2220'], 99999, false);

    const state = getState();
    logAttemptScanAnalytics(state, isManualScan);

    dispatch({
        type: START_DEVICE_SCAN,
        isManualScan: isManualScan,
    });
};

export const stopDeviceScan = () => (dispatch, getState) => {
    BleManager.stopScan();

    const state = getState();
    logCompletedScanAnalytics(state);

    dispatch({
        type: STOP_DEVICE_SCAN
    });
};

export const foundDevice = (deviceName, deviceIdentifier) => ({
    type: FOUND_DEVICE,
    deviceName,
    deviceIdentifier, 
});

// DEVICE

export const connectDevice = (deviceName, deviceIdentifier) => (dispatch, getState) => {
    BleManager.connect(deviceIdentifier); // TODO: should this be device?
    const state = getState();
    logAttemptConnectDeviceAnalytics(false, state);
    dispatch(connectingToDevice(deviceName, deviceIdentifier));

    // HACK: ideally this is a connect timeout saga
    // but it requires both background timer and access to actions
    // therefore putting it here
    connectTimeoutTimer = BackgroundTimer.setTimeout(() => {
        // check to see if stuck connecting
        const state = getState();
        const status = ConnectedDeviceStatusSelectors.getConnectedDeviceStatus(state);
        if (status === 'CONNECTING') {
            // disconnect
            logConnectedToDeviceTimedOutAnalytics(false, state);            
            dispatch(disconnectDevice(false)); // in case it's trying to connect, ensure it's actually disconnecting
            dispatch(disconnectedFromDevice()); // in case it can never find it, visually update
        }
    }, 5000);

    dispatch({
        type: CONNECT_DEVICE,
        deviceName,
        deviceIdentifier,
    });
};

export const reconnectDevice = (deviceName, deviceIdentifier) => (dispatch, getState) => {
    const state = getState();
    logAttemptConnectDeviceAnalytics(true, state);

    // reconnect after a second as V2s have issues
    reconnectTimer = BackgroundTimer.setTimeout(() => {
        BleManager.connect(deviceIdentifier); // TODO: should this be device?
        console.tron.log(`reconnect device called with ${deviceName} and ${deviceIdentifier}`);
        dispatch(connectingToDevice(deviceName, deviceIdentifier));
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
            dispatch(disconnectDevice(false)); // in case it's trying to connect, ensure it's actually disconnecting
            dispatch(disconnectedFromDevice(deviceName, deviceIdentifier)); // in case it can never find it, visually update and trigger another reconnect
            logConnectedToDeviceTimedOutAnalytics(true, state);
        }
    }, 7000);

    dispatch({
        type: RECONNECT_DEVICE,
        deviceName,
        deviceIdentifier,
    });
};

export const disconnectDevice = (performAction=true) => (dispatch, getState) => {
    const state = getState();
    const deviceId = ConnectedDeviceStatusSelectors.getConnectedDeviceIdentifier(state);
    if (!deviceId) {
        // TODO: error handling
        // TODO: confirm this, it might clear the reducer too fast, and if so I'll need another way to grab the id to disconnect from the peripheral
        // places to check are:
        // 1. reconnect canceling
        // 2. settings cancel connecting
        // 3. settings cancel after connecdted
        // 4. turning off power should not call this
        console.tron.log(`unable to disconnect device as no device id saved in reducer`);
        return;
    }

    BleManager.disconnect(deviceId);

    if (performAction) {
        dispatch({
            type: DISCONNECT_DEVICE,
            deviceId,
        });
    }
};

// DEVICE STATUS

export const bluetoothIsOff = () => ({
    type: BLUETOOTH_OFF
});

export const disconnectedFromDevice = (name=null, deviceIdentifier=null) => (dispatch, getState) => {
    clearTimers();

    Analytics.setUserProp('connected_device_id', null);
    Analytics.setUserProp('device_version', null);

    const state = getState();
    const deviceStatus = ConnectedDeviceStatusSelectors.getConnectedDeviceStatus(state);
    if (deviceStatus === 'CONNECTED' || deviceStatus === 'DISCONNECTING') {
        const isIntentional = deviceStatus === 'DISCONNECTING';
        logDisconnectedFromDeviceAnalytics(isIntentional, state);
    }

    dispatch({
        type: DISCONNECTED_FROM_DEVICE,
        deviceName: name,
        deviceIdentifier, 
    });
};

// TODO: i need to ensure identifier is passed in, right now it's just the name
export const connectingToDevice = (name, deviceIdentifier) => ({
    type: CONNECTING_TO_DEVICE,
    deviceName: name,
    deviceIdentifier, 
});

// TODO: this may not be able to receive the name, may want to pull from selector and just live with that for analytics??
export const connectedToDevice = (deviceIdentifier) => (dispatch, getState) => {
    clearTimers();

    // analytics
    const state = getState();
    const name = ConnectedDeviceStatusSelectors.getConnectedDeviceName(state); // rely on name from "connecting" 
    console.tron.log(`got name ${name} and trying to set user prop with it`);
    Analytics.setUserProp('connected_device_id', name);
    checkOBVersion(name);
    logConnectedToDeviceAnalytics(state);

    dispatch({
        type: CONNECTED_TO_DEVICE,
        deviceName: name,
        deviceIdentifier, 
    });
};

export const reconnectingToDevice = (name) => {
    checkOBVersion(name);

    return {
        type: RECONNECTING_TO_DEVICE,
        deviceName: name,
    };
};

// DATA

export const receivedLiftData = (isValid, data, time=new Date()) => (dispatch, getState) => {
    const state = getState();

    logAddRepAnalytics(state);

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

// ANALYTICS

const logAddRepAnalytics = (state) => {
    const currentSet = SetsSelectors.getWorkingSet(state);
    let set_id = currentSet.set_id;
    let rep_count = currentSet.reps.length;
    let has_exercise_name = Boolean(currentSet.exercise);
    let has_weight = Boolean(currentSet.weight);
    let has_rpe = Boolean(currentSet.rpe);
    let has_tags = Boolean(currentSet.tags.length);
    let has_video = Boolean(currentSet.videoFileUrl);
    let has_reps = Boolean(SetsSelectors.getNumWorkoutReps(state));
    let end_set_time_left = SettingsSelectors.getEndSetTimeLeft(state);

    Analytics.logEventWithAppState('add_rep', {
        set_id: set_id,
        rep_count: rep_count,
        has_exercise_name: has_exercise_name,
        has_weight: has_weight,
        has_rpe: has_rpe,
        has_tags: has_tags,
        has_video: has_video,
        has_reps: has_reps,
        end_set_time_left: end_set_time_left,
    }, state);
};

function checkOBVersion(name) {
    if (name.charAt(3) === '1') {
        Analytics.setUserProp('device_version', 'v1')
    } else if (name.charAt(3) === '2') {
        Analytics.setUserProp('device_version', 'v2');
    } else if (name.charAt(3) === '3') {
        Analytics.setUserProp('device_version', 'v3');
    }    
};

const logAttemptScanAnalytics = (state, isManualScan) => {
    Analytics.logEventWithAppState('attempt_scan', {
        is_manual: isManualScan,
    }, state);
};

const logCompletedScanAnalytics = (state) => {
    const isManualScan = ScannedDevicesSelectors.getIsManualScan(state);
    const manualScannedNone = ScannedDevicesSelectors.getManualScannedNone(state);

    Analytics.logEventWithAppState('completed_scan', {
        is_manual: isManualScan,
        manual_scanned_none: manualScannedNone,
    }, state);
};

const logAttemptConnectDeviceAnalytics = (isReconnect, state) => {
    Analytics.logEventWithAppState('attempt_connect_device', {
        is_reconnect: isReconnect
    }, state);
};

const logConnectedToDeviceAnalytics = (state) => {
    Analytics.logEventWithAppState('connected_to_device', {
    }, state);
};

const logConnectedToDeviceTimedOutAnalytics = (isReconnect, state) => {
    Analytics.logEventWithAppState('connect_to_device_timed_out', {
        is_reconnect: isReconnect
    }, state);
};

const logDisconnectedFromDeviceAnalytics = (isIntentional, state) => {
    Analytics.logEventWithAppState('disconnected_from_device', {
        is_intentional: isIntentional
    }, state);
};
