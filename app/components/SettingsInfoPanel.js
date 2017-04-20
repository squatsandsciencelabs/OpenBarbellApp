import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native'

import { SETTINGS_PANEL_STYLES } from '../styles/GlobalStyles';

class SettingsInfoPanel extends Component {

    render() {
        return null;
        
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, SETTINGS_PANEL_STYLES.lastPanel, { flex: 2 }] }>
                <View style={ SETTINGS_PANEL_STYLES.header }>
                    <Text style={ SETTINGS_PANEL_STYLES.headerText }>
                        Info
                    </Text>
                </View>
                <View style={ SETTINGS_PANEL_STYLES.content }>
                    <Text style={{ flex: 1, textAlign: 'center' }}>
                        Your Version: { this.props.killSwitch.currentVersion }
                    </Text>
                    <Text style={{ flex: 1, textAlign: 'center' }}>
                        Most Recent: { this.props.killSwitch.fetchedVersion }
                    </Text>
                    <Text style={{ flex: 1, textAlign: 'center' }}>
                        Status: { this.props.killSwitch.status }
                    </Text>
                </View>
                <View style={ [SETTINGS_PANEL_STYLES.footer, { flexDirection: 'row' }] }>
                    <Text style={{ textAlign: 'center' }}>
                        /TODO: Add Info links (insta, github, website, appstores, etc)/
                    </Text>
                </View>
            </View>
        );
    }

}

export default SettingsInfoPanel