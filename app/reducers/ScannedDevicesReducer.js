// app/reducers/ScannedDevicesReducer.js

import {
	START_DEVICE_SCAN,
	STOP_DEVICE_SCAN,
	FOUND_DEVICE
} from '../ActionTypes';

const ScannedDevicesReducer = ( state = { devices: [], scanning: false }, action) => {
	switch (action.type) {
		case START_DEVICE_SCAN:
			return Object.assign({}, state, {
				devices: [],
				scanning: true
			});
		case STOP_DEVICE_SCAN:
			return Object.assign({}, state, {
				devices: state.devices,
				scanning: false
			});
		case FOUND_DEVICE:
			if(state.devices.includes(action.device) || !action.device.startsWith("OB")) {
				//duplicate entry
				return state;
			} else {
				//new entry
				return Object.assign({}, state, {
					devices: [
						action.device,
						...state.devices
					],
					scanning: state.scanning
				});
			}
		default:
			return state;
	}
};

export default ScannedDevicesReducer
