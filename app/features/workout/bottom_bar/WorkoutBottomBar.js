// TODO: disabled state for end workout

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

class WorkoutBottomBar extends Component {

    _onPressEndWorkout() {
        this.props.endWorkout();
    }

    _renderDevice() {
        // TODO: device info
        return (
            <View></View>
        );
    }

    render() {
        return (
            <View style={styles.bar}>
                { this._renderDevice() }

                <TouchableHighlight style={{justifyContent: 'center'}} onPress={ () => this._onPressEndWorkout() } activeOpacity={1} >
                    <Text style={styles.buttonText}>End Workout</Text>
                </TouchableHighlight>
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
        height: 50,
        padding:0,
    },
    buttonText: {
        color:'white',
        marginRight: 5,
    }
});

export default WorkoutBottomBar;
