// TODO: Move Android permissions that are currently done natively in Java to here
// Exception is bluetooth as the library doesn't appear to handle Bluetooth on Android

// TODO: Permissions alert wrapper so don't lose the first iOS permission request

import Permissions from 'react-native-permissions';
import { Platform } from 'react-native';

export default function() {
    Permissions.request('photo')
    .then((photoReponse) => { return Permissions.request('camera') })
    .then((cameraResponse) => { return Permissions.request('microphone') })
    .then((microphoneResponse) => {
        if (Platform.OS !== 'ios') {        
            Permissions.request('storage');
        }
    });
};
