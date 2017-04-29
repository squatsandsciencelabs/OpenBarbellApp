// app/components/SettingsAccountPanel.js

import React, {Component} from 'react';
import { TouchableHighlight, TouchableOpacity, View, Text } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { SETTINGS_PANEL_STYLES } from '../styles/GlobalStyles';

class SettingsAccountPanel extends Component {

	// NOTE: Wrapping the sign in button to prevent it from running internal code earlier than we want it to
	render() {
		if (this.props.email !== undefined && this.props.email !== null) {
			return (
				<View style={ [SETTINGS_PANEL_STYLES.panel, { flex: 1, flexDirection:'column', justifyContent:'space-between' }] }>
					<Text style={{color:'gray'}}>Logged in as:</Text>
					<Text>{this.props.email}</Text>

					<Text style={{color:'gray', marginTop: 10}}>Last synced to the cloud:</Text>
					<Text>{this.props.syncDate}</Text>
					
					<TouchableOpacity onPress={ () => this.props.signOut() }>
						<Text style={[SETTINGS_PANEL_STYLES.blueButton, {width: 80, padding: 5, marginTop: 20}]}>Logout</Text>
					</TouchableOpacity>
				</View>
			);
		} else if (this.props.isLoggingIn === true) {
			return (
				<View style={ [SETTINGS_PANEL_STYLES.panel, { flex: 1 }] }>
					<Text>Logging in...</Text>
				</View>
			);
		} else {
			return (
				<View style={ [SETTINGS_PANEL_STYLES.panel, { flex: 1 }] }>
					<TouchableHighlight onPress={ () => this.props.signIn() }>
						<View pointerEvents="none" style={{alignItems:'center'}}>
							<GoogleSigninButton style={{width: 212, height: 48}} size={GoogleSigninButton.Size.Standard} color={GoogleSigninButton.Color.Light} />
						</View>
					</TouchableHighlight>
				</View>
			);
		}
	}
}

export default SettingsAccountPanel;
