import React, {Component} from 'react';
import {
    Text,
    View
  } from 'react-native';

import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

class UserLoggedOutPanel extends Component {
    render() {
        let subtitle = this.props.subtitle
        return (
            <View style={ { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20} }>
                <View>
                    <Text style={ SETTINGS_PANEL_STYLES.headerText }>
                        Sign in Required
                    </Text>
                </View>
                <View style={{paddingTop:20, paddingBottom: 50}}>
                    <Text style={ SETTINGS_PANEL_STYLES.subtitleText }>
                        To access your data from the cloud, please go to Settings and log in with your Google account.
                    </Text>
                </View>
            </View>
        );
    }
}

export default UserLoggedOutPanel;
