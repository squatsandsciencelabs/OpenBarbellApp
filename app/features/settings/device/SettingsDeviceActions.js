import { NativeModules } from 'react-native';

import {
    STOP_RECONNECT
} from 'app/ActionTypes';
import * as DeviceActionCreators from 'app/redux/shared_actions/DeviceActionCreators';
import * as Analytics from 'app/services/Analytics';

export const startDeviceScan = () => {
    return DeviceActionCreators.startDeviceScan();
};

export const stopDeviceScan = () => {
    return DeviceActionCreators.stopDeviceScan();
};

export const connectDevice = (device) => {
    return DeviceActionCreators.connectDevice(device);
};

export const disconnectDevice = () => (dispatch, getState) => {
    const state = getState();
    logAttemptDisconnectDeviceAnalytics(state);
    dispatch(DeviceActionCreators.disconnectDevice());
};

export const stopReconnect = () => (dispatch, getState) => {
    const state = getState();
    logCancelReconnectAnalytics(state);

    dispatch({
        type: STOP_RECONNECT
    });
}

const logAttemptDisconnectDeviceAnalytics = (state) => {
    Analytics.logEventWithAppState('attempt_disconnect_device', {
    }, state);
};

const logCancelReconnectAnalytics = (state) => {
    Analytics.logEventWithAppState('cancel_reconnect', {

    }, state);
};
