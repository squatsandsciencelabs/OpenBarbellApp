import firebase from 'react-native-firebase';

export const configure = () => {
    if (__DEV__) {
        firebase.config().enableDeveloperMode();
    }
    
    // Set default values
    firebase.config().setDefaults({
        survey_url: '',
    });

    // test of da firebase reports
    // firebase.fabric.crashlytics().recordError(9001, "this is a test of a non fatal error");
    // firebase.fabric.crashlytics().crash();
};

let app = firebase.app();
app.analytics().setAnalyticsCollectionEnabled(true);

export default firebase;
