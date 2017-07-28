import React, { Component } from 'react';

import SettingsDevicePanelBluetoothOff from './SettingsDevicePanelBluetoothOff';
import SettingsDevicePanelDisconnected from './SettingsDevicePanelDisconnected';
import SettingsDevicePanelConnecting from './SettingsDevicePanelConnecting';
import SettingsDevicePanelConnected from './SettingsDevicePanelConnected';
import SettingsDevicePanelDisconnecting from './SettingsDevicePanelDisconnecting';

class SettingsDevicePanel extends Component {

    render() {
        switch ( this.props.connectedDevice.status ) {
            case 'BLUETOOTH_OFF':
                return <SettingsDevicePanelBluetoothOff />;
            case 'DISCONNECTED':
                return <SettingsDevicePanelDisconnected
                    scannedDevices={ this.props.scannedDevices }
                    startDeviceScan={ this.props.startDeviceScan }
                    stopDeviceScan={ this.props.stopDeviceScan }
                    connectDevice={ this.props.connectDevice }/>;
            case 'CONNECTING':
                return <SettingsDevicePanelConnecting
                    device={ this.props.connectedDevice.deviceName }
                    disconnectDevice={ this.props.disconnectDevice }/>;
            case 'CONNECTED':
                return <SettingsDevicePanelConnected
                    device={ this.props.connectedDevice.deviceName }
                    disconnectDevice={ this.props.disconnectDevice }/>;
            case 'DISCONNECTING':
                return <SettingsDevicePanelDisconnecting
                    device={ this.props.connectedDevice.deviceName }/>;
        }
    }

}

export default SettingsDevicePanel;