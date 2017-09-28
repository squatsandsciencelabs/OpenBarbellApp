import {
    CONNECT_DEVICE,
    RECONNECT_DEVICE,
    STOP_RECONNECT,
    DISCONNECT_DEVICE,
    BLUETOOTH_OFF,
    DISCONNECTED_FROM_DEVICE,
    CONNECTING_TO_DEVICE,
    CONNECTED_TO_DEVICE,
    RECONNECTING_TO_DEVICE
} from 'app/ActionTypes';

const defaultState = {
    status: 'DISCONNECTED',
    deviceName: null,
    deviceIdentifier: null
};

const ConnectedDeviceReducer = ( state = defaultState, action) => {
    switch (action.type) {
        case CONNECT_DEVICE:
        case RECONNECT_DEVICE:
            return Object.assign({}, state, {
                status: 'CONNECTING',
                deviceName: action.deviceName,
                deviceIdentifier: action.deviceIdentifier
            });
        case DISCONNECT_DEVICE:
            // TODO: confirm if there's an issue here with disconnecting from the device
            // It's possible that the disconnect fails and removing the device name and identifier here could cause an issue
            // For now, setting to null on disconnect to differentiate between manual disconnect and other disconnects
            return Object.assign({}, state, {
                status: 'DISCONNECTING',
                deviceName: null,
                deviceIdentifier: null
            });
        case BLUETOOTH_OFF:
            return Object.assign({}, state, {
                status: 'BLUETOOTH_OFF',
                deviceName: null,
                deviceIdentifier: null
            });
        case DISCONNECTED_FROM_DEVICE:
        case STOP_RECONNECT:
            return Object.assign({}, state, {
                status: 'DISCONNECTED',
                deviceName: null,
                deviceIdentifier: null
            });
        case CONNECTING_TO_DEVICE:
            return Object.assign({}, state, {
                status: 'CONNECTING',
                deviceName: action.deviceName,
                deviceIdentifier: action.deviceIdentifier
            });
        case CONNECTED_TO_DEVICE:
            return Object.assign({}, state, {
                status: 'CONNECTED',
                deviceName: action.deviceName,
                deviceIdentifier: action.deviceIdentifier
            });
        case RECONNECTING_TO_DEVICE:
            return Object.assign({}, state, {
                status: 'RECONNECTING',
            });
        default:
            return state;
    }
};

export default ConnectedDeviceReducer;
