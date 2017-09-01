import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import 'app/configs/ReactotronConfig';
import Store from 'app/redux/Store';
import ApplicationScreen from 'app/features/application/ApplicationScreen';
import * as GoogleSignInSetup from 'app/services/GoogleSignInSetup';
import Bluetooth from 'app/services/Bluetooth';
import Permissions from 'app/services/Permissions';

// initialize the store
var store = Store();

// request permissions
Permissions();

// configure google sign in
GoogleSignInSetup.configure();

// start the bluetooth
Bluetooth(store);

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
