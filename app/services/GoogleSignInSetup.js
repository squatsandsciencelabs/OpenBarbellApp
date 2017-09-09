import { GoogleSignin } from 'react-native-google-signin';
import OpenBarbellConfig from 'app/configs/OpenBarbellConfig.json';
import { Alert } from 'react-native';

export const configure = () => {
    GoogleSignin.hasPlayServices({ autoResolve: true })
    .then(GoogleSignin.configure({
        scopes: ["https://www.googleapis.com/auth/drive"],
        iosClientId: OpenBarbellConfig.iOSGoogleClientID,
        webClientId: OpenBarbellConfig.webGoogleClientID
    }))
    .catch((err) => {
        console.tron.log("Fail config google sign in: " + err.message);
        Alert.alert('Configuration Error', "Unfortunately configuring Google Sign In has failed. Try restarting the app to access Cloud features.");
    })
    .done();
};
