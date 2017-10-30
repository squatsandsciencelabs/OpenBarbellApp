// TODO: Refactor this so that the panels are screens rather than passing props manually

import React, { Component } from 'react';

import SettingsDevicePanelBluetoothOff from './panels/SettingsDevicePanelBluetoothOff';
import SettingsDevicePanelDisconnected from './panels/SettingsDevicePanelDisconnected';
import SettingsDevicePanelConnecting from './panels/SettingsDevicePanelConnecting';
import SettingsDevicePanelConnected from './panels/SettingsDevicePanelConnected';
import SettingsDevicePanelDisconnecting from './panels/SettingsDevicePanelDisconnecting';
import SettingsDevicePanelReconnecting from './panels/SettingsDevicePanelReconnecting';

class SettingsDevicePanel extends Component {

    render() {
        switch ( this.props.deviceStatus ) {
            case 'BLUETOOTH_OFF':
                return <SettingsDevicePanelBluetoothOff />;
            case 'DISCONNECTED':
                return <SettingsDevicePanelDisconnected
                    scannedDevices={ this.props.scannedDevices }
                    startDeviceScan={ this.props.startDeviceScan }
                    stopDeviceScan={ this.props.stopDeviceScan }
                    connectDevice={ this.props.connectDevice }
                    tappedTroubleshooting={ this.props.tappedTroubleshooting }/>;
            case 'CONNECTING':
                return <SettingsDevicePanelConnecting
                    device={ this.props.deviceName }
                    disconnectDevice={ this.props.disconnectDevice }/>;
            case 'CONNECTED':
                return <SettingsDevicePanelConnected
                    device={ this.props.deviceName }
                    disconnectDevice={ this.props.disconnectDevice }/>;
            case 'DISCONNECTING':
                return <SettingsDevicePanelDisconnecting
                    device={ this.props.deviceName }/>;
            case 'RECONNECTING':
                return <SettingsDevicePanelReconnecting
                    stopReconnect={ this.props.stopReconnect }/>;
        }
    }

}

export default SettingsDevicePanel;