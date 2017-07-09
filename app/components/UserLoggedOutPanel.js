import React, {Component} from 'react';
import {
    Text,
    View
  } from 'react-native'

import { SETTINGS_PANEL_STYLES } from '../styles/GlobalStyles';

class UserLoggedOutPanel extends Component {
  render() {
    let subtitle = this.props.subtitle;
    return (
      <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
        <View>
        <Text style={ SETTINGS_PANEL_STYLES.headerText }>
          Sorry, this feature is not available.
        </Text>
      </View>
      <View style={{paddingTop:8}}>
        <Text style={ SETTINGS_PANEL_STYLES.subtitleText }>
          The access the history screen, go to settings and log in with a Google account.
        </Text>
      </View>
      </View>
    );
  }
}

export default UserLoggedOutPanel
