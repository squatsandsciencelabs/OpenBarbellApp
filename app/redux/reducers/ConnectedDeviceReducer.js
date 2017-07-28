import {
    CONNECT_DEVICE,
    DISCONNECT_DEVICE,
    BLUETOOTH_OFF,
    DISCONNECTED_FROM_DEVICE,
    CONNECTING_TO_DEVICE,
    CONNECTED_TO_DEVICE
} from 'app/ActionTypes';

const ConnectedDeviceReducer = ( state = { status: 'DISCONNECTED', deviceName: null, deviceIdentifier: null }, action) => {
    switch (action.type) {
        case CONNECT_DEVICE:
            return Object.assign({}, state, {
                status: 'CONNECTING',
                deviceName: action.deviceName,
                deviceIdentifier: action.deviceIdentifier
            });
        case DISCONNECT_DEVICE:
            return Object.assign({}, state, {
                status: 'DISCONNECTING',
                deviceName: state.deviceName,
                deviceIdentifier: action.deviceIdentifier
            });
        case BLUETOOTH_OFF:
            return Object.assign({}, state, {
                status: 'BLUETOOTH_OFF',
                deviceName: null,
                deviceIdentifier: null
            });
        case DISCONNECTED_FROM_DEVICE:
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
        default:
            return state;
    }
};

export default ConnectedDeviceReducer;
