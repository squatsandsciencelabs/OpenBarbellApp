import {
    START_DEVICE_SCAN,
    STOP_DEVICE_SCAN,
    FOUND_DEVICE,
} from 'app/configs+constants/ActionTypes';

const defaultState = {
    devices: [],
    deviceIds: [],
    scanning: false,
    isManualScan: false,
};

const ScannedDevicesReducer = ( state = defaultState, action) => {
    switch (action.type) {
        case START_DEVICE_SCAN:
            return Object.assign({}, state, {
                devices: [],
                deviceIds: [],
                scanning: true,
                isManualScan: action.isManualScan,
            });
        case STOP_DEVICE_SCAN:
            return Object.assign({}, state, {
                devices: state.devices,
                deviceIds: state.deviceIds,
                scanning: false,
                isManualScan: false,
            });
        case FOUND_DEVICE:
            if(state.devices.includes(action.deviceName) || !action.deviceName.startsWith("OB")) {
                //duplicate entry
                return state;
            } else {
                //new entry
                return Object.assign({}, state, {
                    devices: [
                        ...state.devices,
                        action.deviceName,
                    ],
                    deviceIds: [
                        ...state.deviceIds,
                        action.deviceIdentifier,
                    ],
                    scanning: state.scanning
                });
            }
        default:
            return state;
    }
};

export default ScannedDevicesReducer;
