import React, { Component } from 'react';
import { AppRegistry, Text, TextInput } from 'react-native';
import { Provider } from 'react-redux';

import 'app/configs+constants/ReactotronConfig';
import Store from 'app/redux/Store';
import ApplicationScreen from 'app/features/application/ApplicationScreen';
import * as GoogleSignInSetup from 'app/services/GoogleSignInSetup';
import * as Firebase from 'app/services/Firebase';
import Bluetooth from 'app/services/Bluetooth';
import AppState from 'app/services/AppState';
import * as Analytics from 'app/services/Analytics';
import Permissions from 'app/services/Permissions';

// TODO: confirm font scaling disabled
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

// initialize the store
var store = Store();

// request permissions
Permissions();

// initialize analytics
Analytics.setInitialAnalytics();

// configure google sign in
GoogleSignInSetup.configure();

// configure firebase
Firebase.configure();

// start the bluetooth
Bluetooth(store);

// set up app state listeners
AppState(store);

// render
class OpenBarbellApp extends Component {

    render() {
        return (
            <Provider store={store}>
                <ApplicationScreen />
            </Provider>
        )
    }
}

// begin application
export default function () {
    AppRegistry.registerComponent('OpenBarbellApp', () => OpenBarbellApp);
}
