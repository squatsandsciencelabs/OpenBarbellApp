import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import Bluetooth from 'app/services/Bluetooth';
import Store from 'app/redux/Store';
import * as GoogleSignInSetup from 'app/services/GoogleSignInSetup';
import 'app/configs/ReactotronConfig'
import ApplicationScreen from 'app/features/application/ApplicationScreen';
import { fetchVersion } from 'app/redux/shared_actions/KillSwitchActionCreators';

// initialize the store
var store = Store();

// configure google sign in
GoogleSignInSetup.configure();

// start the bluetooth
Bluetooth(store);

// check the kill switch
store.dispatch(fetchVersion());

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
