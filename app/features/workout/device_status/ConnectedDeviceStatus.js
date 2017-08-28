import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

class ConnectedDeviceStatus extends Component {

    render() {
        if (this.props.deviceStatus === 'DISCONNECTED') {
            return <View><Text>{this.props.deviceStatus}</Text></View>
        } else {
            return <View><Text>{this.props.deviceStatus} to {this.props.deviceName}</Text></View>
        }
    }
}

export default ConnectedDeviceStatus;
