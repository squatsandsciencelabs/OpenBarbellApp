import React, { Component } from 'react';
import {
    Text,
    View,
    Image
} from 'react-native'

import { SETTINGS_PANEL_STYLES } from '../styles/GlobalStyles';

// displays connecting device info
class SettingsDevicePanelConnecting extends Component {

    render() {
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, { flex: 1 }] }>
                <View style={ SETTINGS_PANEL_STYLES.header }>
                    <Text style={ SETTINGS_PANEL_STYLES.headerText }>
                        Connecting to { this.props.device }...
                    </Text>
                </View>
                <View style={ SETTINGS_PANEL_STYLES.content }>
                    <Image source={require('../img/icon_bluetooth_connecting.png')} />
                </View>
                <View style={ SETTINGS_PANEL_STYLES.footer }>
                    <Text style={ SETTINGS_PANEL_STYLES.footerCancelText }
                          onPress={ () => this.props.disconnectDevice() }>
                        CANCEL
                    </Text>
                </View>
            </View>
        );
    }

}

export default SettingsDevicePanelConnecting