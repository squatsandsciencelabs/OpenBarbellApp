// TODO: saga-fy this up

import {
    NativeModules,
    NativeEventEmitter,
} from 'react-native';
import BleManager  from 'react-native-ble-manager';

import * as RepDataMap from 'app/utility/RepDataMap';
import * as DeviceActionCreators from 'app/redux/shared_actions/DeviceActionCreators';
import * as ConnectedDeviceStatusSelectors from 'app/redux/selectors/ConnectedDeviceStatusSelectors';

export default function (store) {
    //native bluetooth
    const Emitter = new NativeEventEmitter(NativeModules.BleManager);

    //data
    var repData = [];
    var endBulkDataWasReceived = false;

    // reset
    function resetRep() {
        repData.length = 0;
        endBulkDataWasReceived = false;
    }

    // scanning
    Emitter.addListener('BleManagerDiscoverPeripheral', (args) => {
        store.dispatch(DeviceActionCreators.foundDevice(args.name, args.id));
    });

    // connection status
    Emitter.addListener('BleManagerDidUpdateState', (args) => {
        if (args.state !== 'on') {
            store.dispatch(DeviceActionCreators.bluetoothIsOff());
        } else {
            // TODO: clearn this up by having a bluetooth on action instead of disconnected
            // should have sagas listening to it
            // note that this is basically the same code as the disconnect listener below
            const state = store.getState();
            const name = ConnectedDeviceStatusSelectors.getConnectedDeviceName(state);
            const identifier = ConnectedDeviceStatusSelectors.getConnectedDeviceIdentifier(state);
            store.dispatch(DeviceActionCreators.disconnectedFromDevice(name, identifier));
        }
    });

    Emitter.addListener('BleManagerDisconnectPeripheral', (args) => {
        const state = store.getState();
        const name = ConnectedDeviceStatusSelectors.getConnectedDeviceName(state);
        const identifier = ConnectedDeviceStatusSelectors.getConnectedDeviceIdentifier(state);
        store.dispatch(DeviceActionCreators.disconnectedFromDevice(name, identifier));
    });

    // NOTE: this does not exist in the ble-manager, so doing it in device action creators instead
    // Emitter.addListener('Connecting', (data) => {
    //     store.dispatch(DeviceActionCreators.connectingToDevice(data.name, data.identifier));
    // });

    Emitter.addListener('BleManagerConnectPeripheral', async (args) => {
        // observe reps
        try {
            await BleManager.retrieveServices(args.peripheral);
            await BleManager.startNotification(args.peripheral, '2220', '2221');
            store.dispatch(DeviceActionCreators.connectedToDevice(args.peripheral));
        } catch (err) {
            // TODO: add error logging here
            console.tron.log(`Error setting up service after connecting to peripheral ${err}`);
        }
    });

    // data
    Emitter.addListener('BleManagerDidUpdateValueForCharacteristic', (args) => {
        const data = new Float32Array(new Uint8Array(args.value).buffer)[0];
        console.tron.log("REACT NATIVE LAYER -> RECEIVED DATA " + data);

        // invalid rep data
        if (data == -1234 || data == -2345 || data == -3456) {
            if (queuedDataIsCorrupted(repData)) {
                console.tron.log("FOUND BAD DATA B4 START FLAG, logging it as an invalid rep now!");
                console.tron.log(JSON.stringify(repData));
                store.dispatch(DeviceActionCreators.receivedLiftData(RepDataMap.isValidData(repData), repData));
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
            store.dispatch(DeviceActionCreators.receivedLiftData(RepDataMap.isValidData(repData), repData));

            //reset
            resetRep();
        } else {
            // end bulk data flag check
            endBulkDataWasReceived = (data == -6789);
        }
    });

    try {
        // start the manager
        BleManager.start({
            showAlert: false,
            // disabled for now, more useful for individual mode not kiosk mode
            // restoreIdentifierKey: 'RepOneKioskRestoreIdentifier',
        });
    } catch(err) {
        // TODO: add error logging here
        console.tron.log(`BluetoothSaga error ${JSON.stringify(err)}`);
    }
}

const queuedDataIsCorrupted = (repData) => {
    // more than 1, definitely corrupted
    if (repData.length > 1) {
        return true;
    }

    // only 1, corrupted if it's NOT a start flag
    if (repData.length == 1) {
        if (repData[0] == -3456) {
            return false;
        }
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
