import { NativeModules } from 'react-native';

import {
    START_DEVICE_SCAN,
    STOP_DEVICE_SCAN,
} from 'app/ActionTypes';

const RFDuinoLib = NativeModules.RFDuinoLib;
import * as DeviceActionCreators from 'app/redux/shared_actions/DeviceActionCreators';

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

export const connectDevice = (device) => {
    return DeviceActionCreators.connectDevice(device);
};

export const disconnectDevice = () => {
    return DeviceActionCreators.disconnectDevice();
};
