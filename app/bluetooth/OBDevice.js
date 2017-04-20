// app/bluetooth/OBDevice.js
// this is the thing that listens to the bluetooth device and spams out actions
// it is one directional
// if a class wishes to communicate with OBDevice.js, it should do so through middleware
// the hope is that I can access RFDuinoLib in middleware directly without having to "create" something

import {
    NativeModules,
    NativeEventEmitter,
} from 'react-native';

import {
	FOUND_DEVICE,
	BLUETOOTH_OFF,
	DISCONNECTED_FROM_DEVICE,
	CONNECTING_TO_DEVICE,
	CONNECTED_TO_DEVICE,
	ADD_REP_DATA
} from '../ActionTypes';

import { isValidData } from '../utility/RepDataMap';
import * as DeviceActionCreators from '../actions/DeviceActionCreators';

export default function (store) {

	//native bluetooth
	const RFDuinoLib = NativeModules.RFDuinoLib;
	const Emitter = new NativeEventEmitter(RFDuinoLib);

	//data
	var repData = [];
	var endBulkDataWasReceived = false;

	// reset
	function resetRep() {
		repData.length = 0;
		endBulkDataWasReceived = false;
	}

	// scanning
	Emitter.addListener('Found', (data) => {
	    store.dispatch(DeviceActionCreators.foundDevice(data.name, data.identifier));
	});

	// connection status
	Emitter.addListener('BluetoothOff', (data) => {
	    store.dispatch(DeviceActionCreators.bluetoothIsOff());
	});

	Emitter.addListener('Disconnected', (data) => {
	    store.dispatch(DeviceActionCreators.disconnectedFromDevice());
	});

	Emitter.addListener('Connecting', (data) => {
		store.dispatch(DeviceActionCreators.connectingToDevice(data.name, data.identifier));
	});

	Emitter.addListener('Connected', (data) => {
		store.dispatch(DeviceActionCreators.connectedToDevice(data.name, data.identifier));
	});

	// data
	Emitter.addListener('Data', (data) => {
		console.log("REACT NATIVE LAYER -> RECEIVED DATA " + data);

		// invalid rep data
		if (data == -1234 || data == -2345) {
			if (queuedDataIsCorrupted(repData)) {
				console.log("FOUND BAD DATA B4 START FLAG, logging it as an invalid rep now!");
				console.log(JSON.stringify(repData));
				store.dispatch(DeviceActionCreators.receivedLiftData(isValidData(repData), repData));
			}
			resetRep();
		}
		repData.push(data);

		// if last data entry was the end bulk data flag
		// then this data entry is the battery value
		// and therefore the last data for this rep
		// dispatch it to the rest of the system
		if (endBulkDataWasReceived) {
			//dispatch
			store.dispatch(DeviceActionCreators.receivedLiftData(isValidData(repData), repData));

			//reset
			resetRep();
		} else {
			// end bulk data flag check
			endBulkDataWasReceived = (data == -6789);
		}
	});

	RFDuinoLib.start();
}

const queuedDataIsCorrupted = (repData) => {
	// more than 1, definitely corrupted
	if (repData.length > 1) {
		return true;
	}

	// only 1, corrupted if it's NOT a start flag
	if (repData.length == 1) {
		if (repData[0] == -2345) {
			return false;
		}
		if (repData[0] == -1234) {
			return false;
		}
		return true;
	}

	// less than 0...defaulting to false
	return false;
};
