// app/Application.js

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import OBDevice from './bluetooth/OBDevice';
import ApplicationScreen from './containers/ApplicationScreen';
import Store from './storage/Store';

// initialize the store
var store = Store();

// start the bluetooth
OBDevice(store);

// check the kill switch
import { fetchVersion } from './actions/KillSwitchActionCreators';
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
