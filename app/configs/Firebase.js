import firebase from 'react-native-firebase';
let app = firebase.app();
app.analytics().setAnalyticsCollectionEnabled(true);
export default app;
