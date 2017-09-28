import { take, call, put, apply } from 'redux-saga/effects';
import { Alert } from 'react-native';

import {
    DISCONNECTED_FROM_DEVICE,
    FOUND_DEVICE
} from 'app/ActionTypes';
import * as DeviceActionCreators from 'app/redux/shared_actions/DeviceActionCreators';

// TODO: fork this function so I can actually cancel reconnect mode

const ReconnectSaga = function * ReconnectSaga() {
    while (true) {
        // listen for non manual disconnect
        let reconnectDevice = null;
        while (reconnectDevice === null || reconnectDevice === undefined) {
            const action = yield take(DISCONNECTED_FROM_DEVICE);
            reconnectDevice = action.device;
        }

        // alert
        Alert.alert("Reconnecting!", "It looks like you disconnected, make sure your phone is within range and reduce interference from other bluetooth devices.");

        // set reconnect mode and scan
        yield put(DeviceActionCreators.reconnectingToDevice());
        yield put(DeviceActionCreators.startDeviceScan());

        // find the device
        let foundDevice = null;
        let foundIdentifier = null;
        while (foundDevice !== reconnectDevice) {
            const scanAction = yield take(FOUND_DEVICE);
            foundDevice = scanAction.device;
            foundIdentifier = scanAction.deviceIdentifier;
        }

        // stop scan and connect
        yield put(DeviceActionCreators.stopDeviceScan());
        yield put(DeviceActionCreators.reconnectDevice(foundDevice, foundIdentifier));
    }
};

export default ReconnectSaga;
