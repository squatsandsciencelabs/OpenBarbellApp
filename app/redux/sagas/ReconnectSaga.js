import { take, put, cancel, fork } from 'redux-saga/effects';
import { Alert } from 'react-native';

import {
    DISCONNECTED_FROM_DEVICE,
    FOUND_DEVICE,
    STOP_RECONNECT
} from 'app/ActionTypes';
import * as DeviceActionCreators from 'app/redux/shared_actions/DeviceActionCreators';

const ReconnectSaga = function * ReconnectSaga() {
    while (true) {
        // reconnect
        const task = yield fork(executeReconnect);

        // cancel
        yield take(STOP_RECONNECT);
        yield cancel(task);
        yield put(DeviceActionCreators.disconnectDevice());
        yield put(DeviceActionCreators.disconnectedFromDevice());
    }
};

function* executeReconnect() {
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
        yield put(DeviceActionCreators.reconnectingToDevice(reconnectDevice));
        yield put(DeviceActionCreators.startDeviceScan());
        const restartReconnectTask = yield fork(restartReconnect);        

        // find the device
        let foundDevice = null;
        let foundIdentifier = null;
        while (foundDevice !== reconnectDevice) {
            const scanAction = yield take(FOUND_DEVICE);
            foundDevice = scanAction.device;
            foundIdentifier = scanAction.deviceIdentifier;
        }
        yield cancel(restartReconnectTask);        

        // stop scan and connect
        yield put(DeviceActionCreators.stopDeviceScan());
        yield put(DeviceActionCreators.reconnectDevice(foundDevice, foundIdentifier));
    }
}

function* restartReconnect() {
    while (true) {
        yield take(DISCONNECTED_FROM_DEVICE);
        yield put(DeviceActionCreators.startDeviceScan());
    }
}

export default ReconnectSaga;
