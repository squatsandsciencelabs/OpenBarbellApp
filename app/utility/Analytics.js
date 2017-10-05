import firebase from 'app/configs/Firebase';

// Screens

export const setCurrentScreen = (screen) => {
    firebase.analytics().setCurrentScreen(screen);
};

// User Properties

export const setUserProp = (name, value) => {
    firebase.analytics().setUserProperty(name, value);
};

// Log Events
// params must be an object
export const logEvent = (event, params) => {
    firebase.analytics().logEvent(event, name);
};
