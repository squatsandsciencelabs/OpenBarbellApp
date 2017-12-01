import {
    Alert,
    Platform
} from 'react-native';
import Permissions from 'react-native-permissions';

export const checkWatchVideoPermissions = () => {
    return new Promise(async (resolve, reject) => {
        Permissions.check('photo').then(response => {
            if (response === 'authorized') {
                resolve();
            } else {
                if (Platform.OS === 'ios') {
                    var message = 'OpenBarbell needs Photo permissions to play videos on your phone.\n\nPlease enable them for OpenBarbell in your phone Settings';
                } else {
                    var message = 'OpenBarbell needs Storage permissions to play videos on your phone.\n\nPlease enable them for OpenBarbell in your phone Settings';                    
                }
                Alert.alert(
                    'Additional Permissions Required',
                    message,
                    [{text: 'OK'}],
                    { cancelable: false }
                );
                reject();
            };
        });
    });
};

export const checkRecordingPermissions = () => {
    return new Promise(async (resolve, reject) => {
        Permissions.checkMultiple(['camera', 'photo', 'microphone']).then(response => {
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            const isCameraAuthorized = response.camera === 'authorized';
            const isMicrophoneAuthorized = response.microphone === 'authorized';
            const isStorageAuthorized = response.photo === 'authorized';
            if (isCameraAuthorized && isMicrophoneAuthorized && isStorageAuthorized) {
                resolve();
            } else {
                Alert.alert(
                    'Additional Permissions Required',
                    recordingPermissionsErrorMessage(isCameraAuthorized, isMicrophoneAuthorized, isStorageAuthorized),
                    [{text: 'OK'}],
                    { cancelable: false }
                );
                reject();
            };
        }).catch((error) => {
            reject();
        });
    });
};

const recordingPermissionsErrorMessage = (isCameraAuthorized, isMicrophoneAuthorized, isStorageAuthorized) => {
    if (isCameraAuthorized && isMicrophoneAuthorized && isStorageAuthorized) {
        return null;
    }
    if (isCameraAuthorized && isMicrophoneAuthorized) {
        if (Platform.OS === 'ios') {
            return 'OpenBarbell needs Photo permissions to store videos on your phone.\n\nPlease enable them for OpenBarbell in your phone Settings';
        } else {
            return 'OpenBarbell needs Storage permissions to store videos on your phone.\n\nPlease enable them for OpenBarbell in your phone Settings';
        }
    }
    if (isMicrophoneAuthorized && isStorageAuthorized) {
        return 'OpenBarbell needs Camera permissions to record videos on your phone.\n\nPlease enable them for OpenBarbell in your phone Settings';
    }
    if (isCameraAuthorized && isStorageAuthorized) {
        return 'OpenBarbell needs Microphone permissions to record videos on your phone.\n\nPlease enable them for OpenBarbell in your phone Settings';
    }
    if (isCameraAuthorized) {
        if (Platform.OS === 'ios') {                
            return 'OpenBarbell needs Microphone and Photos permissions to record and store videos on your phone.\n\nPlease enable them for OpenBarbell in your phone Settings';
        } else {
            return 'OpenBarbell needs Microphone and Storage permissions to record and store videos on your phone.\n\nPlease enable them for OpenBarbell in your phone Settings';
        }
    }
    if (isMicrophoneAuthorized) {
        if (Platform.OS === 'ios') {                
            return 'OpenBarbell needs Camera and Photos permissions to record and store videos on your phone.\n\nPlease enable them for OpenBarbell in your phone Settings';
        } else {
            return 'OpenBarbell needs Camera and Storage permissions to record and store videos on your phone.\n\nPlease enable them for OpenBarbell in your phone Settings';
        }
    }
    if (isStorageAuthorized) {
        return 'OpenBarbell needs Camera and Microphone permissions to record videos on your phone.\n\nPlease enable them for OpenBarbell in your phone Settings';
    }
    return null;
}
