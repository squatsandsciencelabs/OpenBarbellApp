import React, { Component } from 'react';
import {
    View,
    Text,
    Stylesheet,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

class ConnectedDeviceStatus extends Component {

    render() {
        if (this.props.deviceStatus === 'CONNECTED') {
            return <View style={styles.statusBar}><Image style={styles.imageStyle} source={require('app/appearance/images/icon_connected.png')} /><Text style={styles.textStyle}> {this.props.deviceName} </Text></View>
        } else {
            return <View style={styles.statusBar}><Image style={styles.imageStyle} source={require('app/appearance/images/icon_disconnected.png')} /><Text style={styles.textStyle}> Not Connected</Text></View>
        }
    }
}

const styles = StyleSheet.create({
    statusBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 5
    },
    textStyle: {
        color: 'white'
    },
    imageStyle: {
        tintColor: 'white'
    }
});

export default ConnectedDeviceStatus;
