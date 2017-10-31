import React, {Component} from 'react';
import {
    Alert,
    TouchableOpacity,
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

class SettingsAccountPanel extends Component {

    _onPressSignOut() {
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
                {text: 'Nevermind', onPress: () => this.props.cancelSignOut(), style: 'cancel'},
                {text: 'Logout', onPress: () => this.props.signOut() },
            ]
        );
    }

    _onPressCSV() {
        this.props.exportCSV();
    }

    // RENDER

    _renderLoggedOut() {
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

    _renderLoggingIn() {
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, { flex: 1 }] }>
                <Text>Logging in...</Text>
            </View>
        );
    }

    _renderExportCSV() {
        var isExportingCSV = this.props.isExportingCSV;
        if (isExportingCSV) {
            return (
                <View style={[SETTINGS_PANEL_STYLES.blueButton, {width: 180, height: 40}]}>
                    <ActivityIndicator
                        style={{flex: 1}}
                        color="white"
                    />
                </View>
            );
        } else {
            return (
                <View>
                    <TouchableOpacity style={[SETTINGS_PANEL_STYLES.blueButton, {width: 180, height: 40}]} onPress={ () => this._onPressCSV() } >
                        <Text style={[SETTINGS_PANEL_STYLES.buttonText]}>Download My Data</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    _renderLoggedIn() {
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, { flex: 1, flexDirection:'column', justifyContent:'space-between' }] }>
                <Text style={{textAlign: 'center', fontSize: 20, marginBottom: 13}}>Account</Text>

                <Text style={{color:'gray', flexWrap: 'wrap', flex: 1, marginBottom: 7}}>Logged in as <Text style={{fontWeight: 'bold', color: 'black'}}>{this.props.email}</Text></Text>

                <Text style={{color:'gray', flexWrap: 'wrap', flex: 1, marginBottom: 20}}>Last data sync was {this.props.syncDate}</Text>

                { this._renderExportCSV() }
                
                <View style={{marginTop: 10}}>
                    <TouchableOpacity style={[SETTINGS_PANEL_STYLES.blueButton, {width: 180, height: 40}]} onPress={ () => this._onPressSignOut() }>
                        <Text style={SETTINGS_PANEL_STYLES.buttonText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // NOTE: Wrapping the sign in button to prevent it from running internal code earlier than we want it to
    render() {
        if (this.props.email !== undefined && this.props.email !== null) {
            return this._renderLoggedIn();
        } else if (this.props.isLoggingIn === true) {
            return this._renderLoggingIn();
        } else {
            return this._renderLoggedOut();
        }
    }
}

export default SettingsAccountPanel;
