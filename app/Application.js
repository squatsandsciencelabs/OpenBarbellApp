import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import 'app/configs/ReactotronConfig';
import Store from 'app/redux/Store';
import ApplicationScreen from 'app/features/application/ApplicationScreen';

// initialize the store
var store = Store();

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
