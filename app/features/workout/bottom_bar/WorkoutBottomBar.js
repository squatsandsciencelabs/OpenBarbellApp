// TODO: disabled state for end workout

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import ConnectedDeviceStatusScreen from './device_status/ConnectedDeviceStatusScreen';
import * as Device from 'app/utility/Device';

class WorkoutBottomBar extends Component {
    
    _onPressEndWorkout() {
        this.props.endWorkout();
    }

    render() {
        const message = 'FINISH WORKOUT';
        return (
            <View style={styles.bar}>
                <ConnectedDeviceStatusScreen />
                <TouchableOpacity style={{justifyContent: 'center'}} onPress={ () => this._onPressEndWorkout() } >
                    <Text style={styles.buttonText}>{message}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch', // stretch to take full height
        justifyContent: 'space-between', // center text vertically
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(47, 128, 237, 1)',
        position: 'absolute',
        height: Device.isIphoneX() ? 70 : 50,
        padding:0,
    },
    buttonText: {
        color:'white',
        marginRight: 5,
        marginBottom: Device.isIphoneX() ? 25 : 0
    }
});

export default WorkoutBottomBar;
