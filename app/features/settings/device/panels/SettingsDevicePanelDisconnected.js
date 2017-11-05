import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet
} from 'react-native';

import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

// TODO: move these into the config file
const INITIAL_SCAN = 5 * 1000;
const REFRESH_SCAN = 5 * 1000;

// allows scan, view, and select of scanned devices
class SettingsDevicePanelDisconnected extends Component {

    constructor(props) {
        super(props);
        this.timer = null;
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

    // ACTIONS

    _scanForDevices(time) {
        this.props.startDeviceScan();

        this.timer = setTimeout(() => {
            this.props.stopDeviceScan();
            this.timer = null;
        }, time);
    }

    _tappedTroubleshooting() {
        this.props.tappedTroubleshooting();
    }

    // RENDER

    render() {
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel] }>
                <View style={ SETTINGS_PANEL_STYLES.header }>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={ SETTINGS_PANEL_STYLES.headerText }>
                            Tap Unit # Below to Connect
                        </Text>
                    </View>
                </View>

                {this._renderRefreshButton()}

                <View style={ [SETTINGS_PANEL_STYLES.content, {alignItems: 'stretch'}] }>
                    { this.props.scannedDevices.scanning ? this._renderScanningMessage() : this._renderDeviceList() }
                </View>
            </View>
        );
    }

    _renderRefreshButton() {
        if (this.props.scannedDevices.scanning) {
            return (<ActivityIndicator
                style={{flex: 1, height: 50}}
                color="gray"
            />)
        }

        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={[SETTINGS_PANEL_STYLES.blueButton, {height: 50}]}
                    disabled={ this.props.scannedDevices.scanning }
                    onPress={ () => this._scanForDevices(REFRESH_SCAN) }>
                        <Text style={SETTINGS_PANEL_STYLES.buttonText}>REFRESH</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _renderDeviceList() {
        if (this.props.scannedDevices.devices.length < 1) {
            return (
                <TouchableOpacity onPress={ () => this.props.tappedTroubleshooting() }>
                    <Text style= {{ textDecorationLine: 'underline'}} >Troubleshooting Tips</Text>
                </TouchableOpacity>
            );
        }

        const deviceRows = this.props.scannedDevices.devices.map((device) => this._renderDeviceRow(device));
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>{deviceRows}</View>
        );
    }

    _renderDeviceRow(device) {
        return (
            <TouchableOpacity style={[{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}, styles.deviceRow]}
                alphaOpactity={1}
                onPress={ () => this.props.connectDevice(device) }>
                    <View><Text style={styles.deviceRowText}>{ device }</Text></View>
                    <Image source={require('app/appearance/images/icon_bluetooth_available.png')}/>
            </TouchableOpacity>
        );
    }

    _renderScanningMessage() {
        return (
            <Text style={{ textAlign: 'center' }}>
                Scanning for OpenBarbell Devices...
            </Text>
        );
    }

}

const styles = StyleSheet.create({
    deviceRow: {
        borderColor: '#e0e0e0',
        borderBottomWidth: 1,
    },
    deviceRowText: {
        color: 'rgba(47, 128, 237, 1)',
        fontSize: 20,
    },
});

export default SettingsDevicePanelDisconnected;
