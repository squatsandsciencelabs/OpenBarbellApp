import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    Linking
} from 'react-native';

import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

const INITIAL_SCAN = 5 * 1000;
const REFRESH_SCAN = 5 * 1000;

// allows scan, view, and select of scanned devices
class SettingsDevicePanelDisconnected extends Component {

    constructor(props) {
        super(props);
        this.state = {
            devicesDS: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }
        this.timer = null;
    }

    _getDataSource(array) {
        return this.state.devicesDS.cloneWithRows(array);
    }

    componentDidMount() {
        this._scanForDevices(INITIAL_SCAN);
    }

    componentWillUnmount() {
        if (this.timer !== null) {
            clearTimeout(this.timer);
            this.props.stopDeviceScan();
        }
    }

    _scanForDevices(time) {
        this.props.startDeviceScan();
        this.setState({ devicesDS: this._getDataSource(this.props.scannedDevices.devices) });

        this.timer = setTimeout(() => {
            this.props.stopDeviceScan();
            this.setState({ devicesDS: this._getDataSource(this.props.scannedDevices.devices) });
            this.timer = null;
        }, time);
    }

    render() {
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, { flex:3 }] }>
                <View style={ SETTINGS_PANEL_STYLES.header }>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={ SETTINGS_PANEL_STYLES.headerText }>
                            Tap Unit # Below to Connect
                        </Text>
                    </View>
                </View>

                {this._renderRefreshButton()}


                <View style={ [SETTINGS_PANEL_STYLES.content, { flex: 2, marginTop: 50 }] }>
                    { this.props.scannedDevices.scanning ? this._renderScanningMessage() : this._renderDeviceList() }
                </View>
            </View>
        );
    }

    _renderRefreshButton() {
        if (this.props.scannedDevices.scanning) {
            return null;
        }

        return (
            <View style={{ flex: 1 }}>
                <Text style={[SETTINGS_PANEL_STYLES.blueButton, {margin: 10}]}
                     onPress={ () => this._scanForDevices(REFRESH_SCAN) }
                     disabled={ this.props.scannedDevices.scanning }>
                        REFRESH
                </Text>
            </View>
        );
    }

    _renderDeviceList() {
        if (this.props.scannedDevices.devices.length < 1) {
            return (
                <TouchableOpacity onPress={ () => Linking.openURL("http://www.squatsandscience.com/troubleshoot/") }>
                    <Text style= {{ textDecorationLine: 'underline'}} >Troubleshooting Tips</Text>
                </TouchableOpacity>
            );
        }

        return (
            <ListView style={ SETTINGS_PANEL_STYLES.contentItemList }
                      dataSource={ this.state.devicesDS }
                      renderRow={ (device) => this._renderDeviceRow(device) }
                      enableEmptySections={ true } />
        );
    }

    _renderDeviceRow(device) {
        return (
            <TouchableOpacity style={ SETTINGS_PANEL_STYLES.contentItemRowConnect }
                alphaOpactity={1}
                onPress={ () => this.props.connectDevice(device) }>

                <View style={ SETTINGS_PANEL_STYLES.contentItemRow }>
                    <Text style={ SETTINGS_PANEL_STYLES.contentItemRowText }>
                        { device }
                    </Text>
                    <Image source={require('app/appearance/images/icon_bluetooth_available.png')}/>
                </View>
            </TouchableOpacity>
        );
    }

    _renderScanningMessage() {
        return (
            <Text style={{ textAlign: 'center' }}>
                Scanning for OpenBarbell Devices
            </Text>
        );
    }

}

export default SettingsDevicePanelDisconnected;
