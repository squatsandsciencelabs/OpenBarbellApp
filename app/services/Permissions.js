// TODO: Move Android permissions that are currently done natively in Java to here
// Exception is bluetooth as the library doesn't appear to handle Bluetooth on Android

// TODO: Just use the library when they add Android requestMultiple permissions
// TODO: Permissions alert wrapper so don't lose the first iOS permission request

import firebase from 'app/services/Firebase';
import {request, PERMISSIONS} from 'react-native-permissions';
import { Platform, PermissionsAndroid } from 'react-native';

export default async function() {
    if (Platform.OS !== 'ios') {
        PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        ]);
    } else {
        // TODO: analytics as a user prop
        // result can have granted true/false or status unknown based on iOS version
        // see https://rnfirebase.io/docs/v3.2.x/messaging/reference/messaging
        await firebase.messaging().requestPermission();
        // await request(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL); // seems to cause illegal callback invocations, so just do bluetooth separately
        await request(PERMISSIONS.IOS.CAMERA);
        await request(PERMISSIONS.IOS.MICROPHONE);
        await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    }
};
