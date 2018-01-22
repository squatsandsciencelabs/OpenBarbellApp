import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { Slider } from 'react-native';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';
import OneRMChart from '../../charts/OneRMChart';
import ExercisePicker from '../OneRM/exercise/ExercisePicker';

class OneRM extends Component {
    // using component level state vs redux here to avoid excessive dispatches for the sliders
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
        if (this.props.isLoggedIn) {
            if (confidence >= this.props.minConfidence) {
                return (
                    <View>
                        <View style={{marginBottom: 20}}>
                            <TouchableOpacity onPress={() => this._tapExercise()}>
                            <Text style={{fontSize: 18, color: 'rgba(47, 128, 237, 1)', textAlign: 'center'}}>
                                {this.props.exercise}
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <ExercisePicker />
                        <Text style={styles.oneRMText}>e1RM: <Text style={{fontWeight: 'bold'}}>{this.props.e1rm}</Text> {this.props.metric}</Text>
                        <Text style={{ textAlign: 'center', fontSize: 15 }}>@ <Text style={{ fontWeight: 'bold' }}> {this.props.velocity} m/s</Text></Text> 
                        <OneRMChart data={this.props.chartData} />
                        <Text style={styles.confidenceText}>Confidence: {this.props.confidence} %</Text>
                    </View>
                );
            } else {
                return (
                    <View>
                        <View style={{marginBottom: 20}}>
                        <TouchableOpacity onPress={() => this._tapExercise()}>
                            <Text style={{fontSize: 18, color: 'rgba(47, 128, 237, 1)', textAlign: 'center'}}>
                                {this.props.exercise}
                            </Text>
                        </TouchableOpacity>
                        </View>
                        <ExercisePicker />
                        <Text style={styles.errorText}>
                            Confidence too low, please clean up or log more data.
                        </Text>
                    </View>
                );
            }
        } else {
            return (
                <Text style={styles.errorText}>
                    You must be logged in for 1rm calculation.
                </Text>
            )
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
        if (Platform.OS === 'ios') {
            return (
                <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                    <Text style={[{marginBottom: 20}, styles.titleText]}>Estimated One-Rep Max</Text>
                    <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                        {this._render1rm(this.props.confidence)}
                        <Text style={styles.labelText}>
                            Velocity
                        </Text>
                        <Slider
                            value={this.props.velocity} 
                            onValueChange={(value) => this.setState({ slidingVelocity: true, velocity: Number(value.toFixed(2)) })}
                            onSlidingComplete={(value) => this._changeVelocitySlider(value)}
                            minimumValue={.01}
                            maximumValue={.41}
                            step={.01}
                            minimumTrackTintColor={'#368fff'}
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
                            minimumTrackTintColor={'#368fff'}
                            animateTransitions={true}
                        />
                        <Text style={styles.numberStyle}>{this.state.days} days</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                    <Text style={[{marginBottom: 20}, styles.titleText]}>Estimated One-Rep Max</Text>
                    <View style={{marginBottom: 10}}>
                        <ExercisePicker />  
                    </View>
                    <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                        {this._render1rm(this.props.confidence)}
                        <Text style={styles.labelText}>
                            Velocity
                        </Text>
                        <Slider
                            value={this.props.velocity} 
                            onValueChange={(value) => this.setState({ slidingVelocity: true, velocity: Number(value.toFixed(2)) })}
                            onSlidingComplete={(value) => this._changeVelocitySlider(value)}
                            minimumValue={.01}
                            maximumValue={.41}
                            step={.01}
                            thumbTintColor={'#368fff'}
                            minimumTrackTintColor={'#368fff'}
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
                            thumbTintColor={'#368fff'}
                            minimumTrackTintColor={'#368fff'}
                            animateTransitions={true}
                        />
                        <Text style={styles.numberStyle}>{this.state.days} days</Text>
                    </View>
                </View>
            ) 
        }
        
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
