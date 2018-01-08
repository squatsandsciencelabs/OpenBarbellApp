import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import { Slider } from 'react-native';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';
import OneRMChart from '../../charts/OneRMChart';
import ExercisePicker from '../OneRM/exercise/ExercisePicker';

class OneRM extends Component {
    // using component level state vs redux here to avoid excessive dispatches
    constructor(props) {
        super(props);

        this.state = {
            velocity: this.props.velocity,
            days: this.props.days
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            velocity: nextProps.velocity,
            days: nextProps.days
        })
    }

    _render1rm(confidence) {
        if (confidence >= 90) {
            return (
                <View>
                    <Text style={styles.oneRMText}>e1RM: <Text style={{fontWeight: 'bold'}}>{this.props.e1rm}</Text> {this.props.metric}</Text>
                    <Text style={{ textAlign: 'center', fontSize: 15 }}>@ <Text style={{ fontWeight: 'bold' }}> {this.props.velocity} m/s</Text></Text> 
                    <OneRMChart data={this.props.chartData} />
                    <Text style={styles.confidenceText}>Confidence: {this.props.confidence} %</Text>
                </View>
            );
        } else {
            return (
                <Text style={styles.errorText}>
                    Confidence too low, please clean up or log more data.
                </Text>
            );
        }
    }

    _tapExercise() {
        this.props.tapExercise();
    }

    _changeVelocitySlider(value) {
        this.props.changeVelocity(value);
    }

    _changeDaysSlider(value) {
        this.props.changeDays(value);
    }

    render() {
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                <Text style={[{marginBottom: 20}, styles.titleText]}>Estimated One-Rep Max</Text>
                <View style={{marginBottom: 20}}>
                    <TouchableOpacity onPress={() => this._tapExercise()}>
                        <Text style={{fontSize: 18, color: 'rgba(47, 128, 237, 1)', textAlign: 'center'}}>
                            {this.props.exercise}
                        </Text>
                    </TouchableOpacity>
                </View>
                <ExercisePicker />
                <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                    {this._render1rm(this.props.confidence)}
                    <Text style={styles.labelText}>
                        Velocity
                    </Text>
                        <Slider
                            value={this.props.velocity} 
                            onValueChange={(value) => this.setState({ slidingVelocity: true, velocity: Number(value.toFixed(2)) })}               // 
                            onSlidingComplete={(value) => this._changeVelocitySlider(value)}
                            minimumValue={.01}
                            maximumValue={.41}
                            step={.01}
                            thumbTintColor={'white'}
                            minimumTrackTintColor={'#368fff'}
                            thumbStyle={styles.thumbStyle}
                            animateTransitions={true}
                        />
                        <Text style={styles.numberStyle}>{this.state.velocity} m/s</Text>
                    <Text style={styles.labelText}>
                        Date Range
                    </Text>
                        <Slider
                            value={this.props.days} 
                            onValueChange={(value) => this.setState({ slidingDays: true, days: Number(value.toFixed(2)) })}
                            onSlidingComplete={(value) => this._changeDaysSlider(value)}
                            minimumValue={1}
                            maximumValue={7}
                            step={1}
                            thumbTintColor={'white'}
                            minimumTrackTintColor={'#368fff'}
                            thumbStyle={styles.thumbStyle}
                            animateTransitions={true}
                        />
                        <Text style={styles.numberStyle}>{this.state.days} days</Text>
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
        marginBottom: 5,
        fontSize: 32, 
        textAlign: 'center'
    },
    confidenceText: {
        color: 'rgba(77, 77, 77, 1)',
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center'
    },
    errorText: {
        color: 'rgba(77, 77, 77, 1)',
        marginBottom: 20, 
        fontSize: 20, 
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
    },
    dropdownButton: {
        backgroundColor: 'rgba(47, 128, 237, 1)',
        borderRadius: 3,
        marginLeft: 5,
        marginBottom: 5,
        height: 40,
    },
});

export default OneRM;
