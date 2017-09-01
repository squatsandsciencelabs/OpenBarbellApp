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
            <View style={ { flex: 1, flexDirection: 'column', marginTop: 225, margin: 20 } }>
                <View>
                    <Text style={ SETTINGS_PANEL_STYLES.headerText }>
                        Sorry, this feature is not available.
                    </Text>
                </View>
                <View style={{paddingTop:8}}>
                    <Text style={ SETTINGS_PANEL_STYLES.subtitleText }>
                        { subtitle }
                    </Text>
                </View>
            </View>
        );
    }
}

export default UserLoggedOutPanel;
