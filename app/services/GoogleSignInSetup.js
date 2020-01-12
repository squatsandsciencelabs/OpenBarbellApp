import { Alert } from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';

import OpenBarbellConfig from 'app/configs+constants/OpenBarbellConfig.json';
import * as Analytics from 'app/services/Analytics';

export const configure = async () => {
    // configure for export csv upload
    GoogleSignin.configure({
        // note: this was the old setup, new one may require more properties
        scopes: ["https://www.googleapis.com/auth/drive.file"],
        iosClientId: OpenBarbellConfig.iOSGoogleClientID,
        webClientId: OpenBarbellConfig.webGoogleClientID
    });
    try {
        await GoogleSignin.hasPlayServices(); // probably should do this every time to force the await
        const user = await GoogleSignin.getCurrentUser();
        if (user !== null) {
            Analytics.setUserID(user.id);
        } else {
            Analytics.setUserID();
        }
    } catch (err) {
        console.tron.log("Fail config google sign in: " + err.message);
        Alert.alert('Configuration Error', "Unfortunately configuring Google Sign In has failed. Try restarting the app to access Cloud features.");
    }
};
