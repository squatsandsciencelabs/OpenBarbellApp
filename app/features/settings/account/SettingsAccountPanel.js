import React, {Component} from 'react';
import {
    Alert,
    TouchableOpacity,
    View,
    Text,
    Switch
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
                {text: 'Nevermind', onPress: null, style: 'cancel'},
                {text: 'Logout', onPress: () => this.props.signOut() },
            ]
        );
    }

    _onPressCSV() {
        this.props.exportCSV();
    }

    _onPressSwitch(isSwitchOn) {
        if (isSwitchOn) {
            this.props.showRemoved();
        } else {
            this.props.hideRemoved();
        }
    }

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
                <View>
                <Text style={{color:'gray', marginTop: 10}}>Data:</Text>
                <ActivityIndicator
                    style={{marginLeft: 10}}
                    color="white"
                />
                </View>
            );
        } else {
            return (
                <View>
                <Text style={{color:'gray', marginTop: 10}}>Data:</Text>                
                <TouchableOpacity style={{justifyContent: 'center'}} onPress={ () => this._onPressCSV() } >
                    <Text style={[SETTINGS_PANEL_STYLES.blueButton, {padding: 5, width: 100}]}>Export CSV</Text>
                </TouchableOpacity>
                </View>
            );
        }
    }

    _renderShowDeleted() {
        return (
            <View>            
            <Text style={{color:'gray', marginTop: 10}}>Show Deleted:</Text>
            <Switch
                style={{backgroundColor: 'white', marginLeft: 3, marginRight: 5}}
                value={this.props.shouldShowRemoved}
                onValueChange={(isSwitchOn) => this._onPressSwitch(isSwitchOn)}
                onTintColor='rgba(47, 128, 237, 1)'
                thumbTintColor='rgba(47, 128, 237, 1)'
                tintColor='rgba(47, 128, 237, 1)'/>
            </View>
        );
    }

    _renderLoggedIn() {
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, { flex: 1, flexDirection:'column', justifyContent:'space-between' }] }>
                <Text style={{color:'gray'}}>Logged in as:</Text>
                <Text>{this.props.email}</Text>

                <Text style={{color:'gray', marginTop: 10}}>Last synced to the cloud:</Text>
                <Text>{this.props.syncDate}</Text>

                { this._renderExportCSV() }

                { this._renderShowDeleted() }
                
                <TouchableOpacity style={{width: 100, marginTop: 20}} onPress={ () => this._onPressSignOut() }>
                    <Text style={[SETTINGS_PANEL_STYLES.blueButton, {padding: 5}]}>Logout</Text>
                </TouchableOpacity>
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
