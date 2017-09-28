import { NativeModules } from 'react-native';

import {
    STOP_RECONNECT
} from 'app/ActionTypes';
import * as DeviceActionCreators from 'app/redux/shared_actions/DeviceActionCreators';

export const startDeviceScan = () => {
    return DeviceActionCreators.startDeviceScan();
};

export const stopDeviceScan = () => {
    return DeviceActionCreators.stopDeviceScan();
};

export const connectDevice = (device) => {
    return DeviceActionCreators.connectDevice(device);
};

export const disconnectDevice = () => {
    return DeviceActionCreators.disconnectDevice();
};

export const stopReconnect = () => ({ type: STOP_RECONNECT });
