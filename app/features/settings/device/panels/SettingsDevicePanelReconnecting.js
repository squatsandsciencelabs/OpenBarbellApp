import React, { Component } from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';

import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

// displays connecting device info
class SettingsDevicePanelReconnecting extends Component {

    render() {
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, { flex: 1 }] }>
                <View style={ SETTINGS_PANEL_STYLES.header }>
                    <Text style={ SETTINGS_PANEL_STYLES.headerText }>
                        Reconnecting...
                    </Text>
                </View>
                <View style={ SETTINGS_PANEL_STYLES.content }>
                    <Image source={require('app/appearance/images/icon_bluetooth_connecting.png')} />
                </View>
                <View style={ SETTINGS_PANEL_STYLES.footer }>
                    <Text style={ SETTINGS_PANEL_STYLES.footerCancelText }
                          onPress={ () => this.props.stopReconnect() }>
                        CANCEL
                    </Text>
                </View>
            </View>
        );
    }

}

export default SettingsDevicePanelReconnecting;
