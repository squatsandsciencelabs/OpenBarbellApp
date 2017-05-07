import React, {Component} from 'react';
import {
    TouchableHighlight,
    Text,
    StyleSheet,
    View,
    ListView
} from 'react-native'

import SettingsDevicePanel from './SettingsDevicePanel';
import SettingsAccountPanel from './SettingsAccountPanel';
import SettingsApplicationPanel from './SettingsApplicationPanel';
import SettingsInfoPanel from './SettingsInfoPanel';

class SettingsTab extends Component {

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent:'flex-start' }}>
                <SettingsDevicePanel
                    scannedDevices={ this.props.scannedDevices }
                    connectedDevice={ this.props.connectedDevice }
                    startDeviceScan={ this.props.startDeviceScan }
                    stopDeviceScan={ this.props.stopDeviceScan }
                    connectDevice={ this.props.connectDevice }
                    disconnectDevice={ this.props.disconnectDevice }/>
                <SettingsAccountPanel
                    email={this.props.email}
                    signIn={this.props.signIn}
                    signOut={this.props.signOut}
                    syncDate={this.props.syncDate}
                    hasChangesToSync = {this.props.hasChangesToSync}
                    isLoggingIn={this.props.isLoggingIn} />
                <SettingsApplicationPanel
                    editSetTimer={ this.props.editSetTimer }
                    endEditSetTimer={ this.props.editEndEditSetTimer }
                    endSetTimerDuration={ this.props.endSetTimerDuration }
                />
                <SettingsInfoPanel
                    killSwitch={ this.props.killSwitch }/>
            </View>
        );
    }
}

export default SettingsTab
