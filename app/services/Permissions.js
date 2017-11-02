// TODO: Move Android permissions that are currently done natively in Java to here
// Exception is bluetooth as the library doesn't appear to handle Bluetooth on Android

// TODO: Just use the library when they fix Android permissions issues
// TODO: Permissions alert wrapper so don't lose the first iOS permission request

import Permissions from 'react-native-permissions';
import { Platform, PermissionsAndroid } from 'react-native';

export default function() {
    if (Platform.OS !== 'ios') {
        PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        ]);
    } else {
        Permissions.request('photo');
        Permissions.request('camera');
        Permissions.request('microphone');
    }
};
