import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import 'app/configs/ReactotronConfig';
import Store from 'app/redux/Store';
import ApplicationScreen from 'app/features/application/ApplicationScreen';
import * as GoogleSignInSetup from 'app/services/GoogleSignInSetup';
import Bluetooth from 'app/services/Bluetooth';
import AppState from 'app/utility/AppState';
import * as Analytics from 'app/utility/Analytics';
import Permissions from 'app/services/Permissions';

// initialize the store
var store = Store();

// request permissions
Permissions();

// initialize analytics
Analytics.setInitialAnalytics();

// configure google sign in
GoogleSignInSetup.configure();

// start the bluetooth
Bluetooth(store);

// set up app state listeners
AppState(store);

// render
class OBBApp extends Component {

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
    AppRegistry.registerComponent('OBBApp', () => OBBApp);
}
