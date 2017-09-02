import React, {Component} from 'react';
import { Alert, TouchableOpacity, View, Text } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

class SettingsAccountPanel extends Component {

    tappedSignOut() {
        var message = "";
        if (this.props.hasChangesToSync) {
            message = "WARNING: You have changes that haven't been synced to the cloud. Logging out will cause you to lose them.";
        } else {
            message = "History data on this phone will be cleared.";
        }

        Alert.alert(
            'Are you sure?',
            message,
            [
                {text: 'Nevermind', onPress: null, style: 'cancel'},
                {text: 'Logout', onPress: () => this.props.signOut() },
            ]
        );
    }

    // NOTE: Wrapping the sign in button to prevent it from running internal code earlier than we want it to
    render() {
        if (this.props.email !== undefined && this.props.email !== null) {
            return (
                <View style={ [SETTINGS_PANEL_STYLES.panel, { flex: 1, flexDirection:'column', justifyContent:'space-between' }] }>
                    <Text style={{color:'gray'}}>Logged in as:</Text>
                    <Text>{this.props.email}</Text>

                    <Text style={{color:'gray', marginTop: 10}}>Last synced to the cloud:</Text>
                    <Text>{this.props.syncDate}</Text>
                    
                    <TouchableOpacity style={{width: 100, marginTop: 20}} onPress={ () => this.tappedSignOut() }>
                        <Text style={[SETTINGS_PANEL_STYLES.blueButton, {padding: 5}]}>Logout</Text>
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
                    <Text style={{color:'gray', marginBottom: 15, textAlign: 'center'}}>Sign in to sync data to the cloud</Text>
                    <TouchableOpacity onPress={ () => this.props.signIn() }>
                        <View pointerEvents="none" style={{alignItems:'center'}}>
                            <GoogleSigninButton style={{width: 212, height: 48}} size={GoogleSigninButton.Size.Standard} color={GoogleSigninButton.Color.Light} />
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

export default SettingsAccountPanel;
