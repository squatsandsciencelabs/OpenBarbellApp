import firebase from 'react-native-firebase';

export const configure = () => {
    if (__DEV__) {
        firebase.config().enableDeveloperMode();
    }
    
    // Set default values
    firebase.config().setDefaults({
        survey_url: '',
    });

    // firebase.crashlytics().crash();
};

let app = firebase.app();
app.analytics().setAnalyticsCollectionEnabled(true);

export default firebase;
