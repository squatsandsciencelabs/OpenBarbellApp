import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Animated,
    Easing
} from 'react-native';

class TimerProgressBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            barAnimations: new Animated.Value(0),
        };
    }

    shouldComponentUpdate(nextProps) {
        const differentTimerDuration = nextProps.timerDuration !== this.props.timerDuration;
        const differentTimerRemaining = nextProps.timerRemaining !== this.props.timerRemaining;
        const differentTimerStatus = nextProps.timerStatus !== this.props.timerStatus;

        if (differentTimerDuration || differentTimerRemaining || differentTimerStatus) {
            // set initial position
            const value = (nextProps.timerDuration-nextProps.timerRemaining)/nextProps.timerDuration;
            this.state.barAnimations.setValue(value);

            if (nextProps.timerStatus === 'inactive' || nextProps.timerStatus === 'paused') {
                // pause it
                this.state.barAnimations.stopAnimation();
            } else {
                // start it
                Animated.timing(
                    this.state.barAnimations,
                    {
                        toValue: 1.0, // can i make this a percent? for now just have it work <_>
                        duration: nextProps.timerRemaining,
                        easing: Easing.linear
                    }
                ).start();
            }
            return true;
        }

        return false;
    }

    render() {
        const barAnimation = this.state.barAnimations;

        return (
            <View style={[styles.shadow, {flex:1, flexDirection: 'row', alignItems:'stretch', backgroundColor:'white'}]}>
                <Animated.View style={{flex: barAnimation, height: 2, backgroundColor: 'green'}}></Animated.View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {
            height: 4,
            width: 0
        },
    },
});

export default TimerProgressBar;
