import React, { Component } from 'react';
import {
    View,
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
        const differentProjectedEndSetTime = nextProps.projectedEndSetTime !== this.props.projectedEndSetTime;        
        const differentTimerDuration = nextProps.timerDuration !== this.props.timerDuration;
        const differentTimerRemaining = nextProps.timerRemaining !== this.props.timerRemaining;
        const differentTimerStatus = nextProps.timerStatus !== this.props.timerStatus;

        if (differentProjectedEndSetTime || differentTimerDuration || differentTimerRemaining || differentTimerStatus) {
            // set initial position
            const value = (nextProps.timerDuration-nextProps.timerRemaining)/nextProps.timerDuration;
            this.state.barAnimations.setValue(value);

            if (nextProps.timerStatus === 'stopped' || nextProps.timerStatus === 'paused') {
                // pause it
                this.state.barAnimations.stopAnimation();
            } else {
                // start it
                Animated.timing(
                    this.state.barAnimations,
                    {
                        toValue: 1.0,
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
            <View style={[{flex:1, flexDirection: 'row', alignItems:'stretch', backgroundColor:'#e0e0e0'}]}>
                <Animated.View style={{flex: barAnimation, height: 1, backgroundColor: 'green'}}></Animated.View>
            </View>
        );
    }

}

export default TimerProgressBar;
