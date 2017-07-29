import { NativeModules } from 'react-native';

import {
    CONNECT_DEVICE,
    DISCONNECT_DEVICE,
    START_DEVICE_SCAN,
    STOP_DEVICE_SCAN,
} from 'app/ActionTypes';

const RFDuinoLib = NativeModules.RFDuinoLib;

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
