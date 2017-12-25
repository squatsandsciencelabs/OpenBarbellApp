import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';
import { Slider } from 'react-native-elements';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';
import * as OneRepMax from 'app/utility/transforms/OneRepMax';

class OneRMSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.velocity
        };
    }

    render() {
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                <Text style={[{marginBottom: 20}, styles.titleText]}>Estimated One-Rep Max</Text>
                <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                <Text style={styles.oneRMText}>e1RM: </Text>
                    <Text style={styles.labelText}>
                        Velocity
                    </Text>
                    <Slider
                    value={this.props.velocity} 
                    onValueChange={(value) => this.setState({ value: Number(value.toFixed(2)) })}
                    onSlidingStart={this.props.disableTabSwipe}
                    onSlidingComplete={(value) => this.props.changeVelocity(value)}
                    minimumValue={.01}
                    maximumValue={.41}
                    step={.01}
                    thumbTintColor={'white'}
                    minimumTrackTintColor={'#368fff'}
                    thumbStyle={styles.thumbStyle}
                    animateTransitions={true}
                    /><Text style={styles.numberStyle}>{this.state.value}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleText: {
        color: 'rgba(77, 77, 77, 1)',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        marginBottom: 5
    },
    oneRMText: {
        color: 'rgba(77, 77, 77, 1)',
        marginBottom: 20, 
        fontSize: 32, 
        textAlign: 'center'
    },
    thumbStyle: {
        width: 30,
        height: 30,
        borderWidth: 1.5,
        borderColor: '#b2b1b2',
        borderRadius: 20
    },
    numberStyle: {
        fontSize: 16
    }
});

export default OneRMSlider;
