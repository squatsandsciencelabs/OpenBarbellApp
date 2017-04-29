// app/utility/GoogleSignInSetup.js

import config from '../config.json';
import { GoogleSignin } from 'react-native-google-signin';

export const configure = () => {
    GoogleSignin.hasPlayServices({ autoResolve: true })
    .then(GoogleSignin.configure({
        scopes: ["https://www.googleapis.com/auth/drive"],
        iosClientId: config.iOSGoogleClientID,
        webClientId: config.webGoogleClientID
    }))
    .catch((err) => {
        console.log("Fail config google sign in: " + err.mesage);
        alert("Unfortuantely configuring Google Sign In has failed. Try restarting the app to access Cloud features.");
    })
    .done();
};