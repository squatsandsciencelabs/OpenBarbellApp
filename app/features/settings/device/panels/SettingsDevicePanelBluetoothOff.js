import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';

import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

// displays connected device info, allows disconnect from device
class SettingsDevicePanelBluetoothOff extends Component {

    render() {
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, { flex: 1 }] }>
                <View style={ SETTINGS_PANEL_STYLES.header }>
                    <Text style={ SETTINGS_PANEL_STYLES.headerText }>
                        Tap Unit # to Connect
                    </Text>
                </View>
                <View style={ SETTINGS_PANEL_STYLES.content }>
                    <Text style={ SETTINGS_PANEL_STYLES.footerCancelText }>
                        Please enable Bluetooth to connect to a device
                    </Text>
                </View>
                <View style={ SETTINGS_PANEL_STYLES.footer }/>
            </View>
        );
    }

}

export default SettingsDevicePanelBluetoothOff;
