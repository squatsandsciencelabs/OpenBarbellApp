import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Platform,
    TouchableHighlight,
    Image,
} from 'react-native';
import { Slider } from 'react-native';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';
import OneRMChartScreen from 'app/features/analysis/charts/OneRMChartScreen';
import ExercisePicker from 'app/features/analysis/cards/OneRM/exercise/ExercisePicker';
import EditAnalysisTagsToIncludeScreen from './tags/tagsToInclude/EditAnalysisTagsToIncludeScreen';
import EditAnalysisTagsToExcludeScreen from './tags/tagsToExclude/EditAnalysisTagsToExcludeScreen';
import Pill from 'app/shared_features/pill/Pill';
import * as Device from 'app/utility/Device';

class OneRMView extends Component {
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

    _render1rm(r2) {
        if (this.props.isLoggedIn) {
            if (this.props.chartData && this.props.chartData.length > 3 && this.props.regLineData && this.props.regLineData.length > 3) {
                if (r2 >= this.props.minr2) {
                    let e1rm = this.props.e1rm ? this.props.e1rm : "---";
                    let e1rmVelocity = this.props.e1rmVelocity ? this.props.e1rmVelocity : "---";

                    return (
                        <View>
                            <OneRMChartScreen isR2HighEnough={true} data={this.props.chartData} regLineData={this.props.regLineData} />
                            <Text style={styles.oneRMText}>e1RM: <Text style={{fontWeight: 'bold'}}>{e1rm}</Text> {this.props.metric}</Text>
                            <Text style={{ textAlign: 'center', fontSize: 15, marginBottom: 20 }}>@ <Text style={{ fontWeight: 'bold' }}> {this.props.e1rmVelocity} m/s</Text></Text> 
                            <Text style={styles.r2Text}>r2: {this.props.r2} %</Text>
                            {this._renderForms()}
                        </View>
                    );
                } else {
                    return (
                        <View>
                            <OneRMChartScreen isR2HighEnough={false} data={this.props.chartData} />
                            <Text style={styles.errorText}>
                                r2 too low, please clean up or log more data.
                            </Text>
                            {this._renderForms()}
                        </View>
                    );
                } 
            } else {
                return (
                    <View>
                        <Text style={styles.errorText}>
                            This exercise with these tags does not contain enough reps within the date range.
                        </Text>
                        {this._renderForms()}
                    </View>
                );
            }
        } else {
            const size = Device.isSmallDevice() ? 250 : 300;

            return (
                <View>
                    <Image style={{width: size, height: size, marginBottom: 20}} source={require('app/appearance/images/grayed_chart.png')} />
                    <Text style={styles.errorText}>
                        You must be logged in for 1rm calculation.
                    </Text>
                </View>
            )
        }
    }

    _renderCalculate1rm() {
        if (this.props.isLoggedIn) {
            return (
                <View style={[styles.button, {marginTop: 20}]}>
                    <TouchableOpacity onPress={ () => this.props.calcE1rm() }>
                        <Text style={styles.buttonText}>Calculate</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={[styles.disabledButton, {marginTop: 20}]}>
                    <Text style={styles.buttonText}>Calculate</Text>
                </View>
            );
        }
    }

    _tappedExercise() {
        this.props.tappedExercise();
    }

    _changeVelocitySlider(value) {
        this.props.changeVelocity(value);
    }

    _changeDaysSlider(value) {
        this.props.changeDays(value);
    }

    _displayTagsToInclude() {
        if (this.props.tagsToInclude === undefined || this.props.tagsToInclude === null || this.props.tagsToInclude.length === 0) {
            return (<Text style={[styles.tagText, styles.placeholderText]}>Tags to Include</Text>);
        }

        let position = 0;

        const pills = this.props.tagsToInclude.map((tag) => {
            return <Pill key={position++} text={tag} style={{paddingRight: 5, paddingBottom: 3, paddingTop: 3}} />
        });

        return (<View style={styles.tagField}>{pills}</View>);
    }

    _renderTagsToInclude() {
        return (
            <View style={[styles.field, {flex: 1}]}>
                <TouchableHighlight onPress={() => this.props.tappedTagsToInclude()} underlayColor='#e0e0e0'>
                    {this._displayTagsToInclude()}
                </TouchableHighlight>
            </View>
        );
    }

    _displayTagsToExclude() {
        if (this.props.tagsToExclude === undefined || this.props.tagsToExclude === null || this.props.tagsToExclude.length === 0) {
            return (<Text style={[styles.tagText, styles.placeholderText]}>Tags to Exclude</Text>);
        }

        let position = 0;

        const pills = this.props.tagsToExclude.map((tag) => {
            return <Pill key={position++} text={tag} style={{paddingRight: 5, paddingBottom: 3, paddingTop: 3}} />
        });

        return (<View style={styles.tagField}>{pills}</View>);
    }

    _renderTagsToExclude() {
        return (
            <View style={[styles.field, {flex: 1}]}>
                <TouchableHighlight onPress={() => this.props.tappedTagsToExclude()} underlayColor='#e0e0e0'>
                    {this._displayTagsToExclude()}
                </TouchableHighlight>
            </View>
        );
    }

    _renderForms() {
        if (Platform.OS === 'ios') {
            return (
                <View>
                    <View style={{marginBottom: 20}}>
                        <TouchableOpacity onPress={() => this._tappedExercise()}>
                            <Text style={{fontSize: 18, color: 'rgba(47, 128, 237, 1)', textAlign: 'center', marginBottom: 20}}>
                                {this.props.exercise}
                            </Text>
                        </TouchableOpacity>
                        <Text style={{textAlign: 'center', fontSize: 15, marginBottom: 10}}>Tags to Include:</Text>
                        <View style={{marginBottom: 10}}>{ this._renderTagsToInclude() }</View>
                        <Text style={{textAlign: 'center', fontSize: 15, marginBottom: 10}}>Tags to Exclude:</Text>
                        <View>{ this._renderTagsToExclude() }</View>
                    </View>
                    <ExercisePicker />
                    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                        <EditAnalysisTagsToIncludeScreen />
                        <EditAnalysisTagsToExcludeScreen />
                    </View>
                </View>
            );
        } else {
            return (
                <View>
                    <View style={{marginBottom: 10}}>
                        <ExercisePicker />  
                    </View>
                    <Text style={{textAlign: 'center', fontSize: 15, marginBottom: 10}}>Tags to Include:</Text>
                    <View style={{marginBottom: 10}}>{ this._renderTagsToInclude() }</View>
                    <Text style={{textAlign: 'center', fontSize: 15, marginBottom: 10}}>Tags to Exclude:</Text>
                    <View>{ this._renderTagsToExclude() }</View>
                    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', marginBottom: 20 }}>
                        <EditAnalysisTagsToIncludeScreen />
                        <EditAnalysisTagsToExcludeScreen />
                    </View>
                </View>
            );
        }
    }

    render() {
        if (Platform.OS === 'ios') {
            return (
                <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                    <Text style={[{marginBottom: 15}, styles.titleText]}>Estimated One-Rep Max</Text>
                    <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                        {this._render1rm(this.props.r2)}
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
                            value={this.props.days * -1} 
                            onValueChange={(value) => this.setState({ slidingDays: true, days: Number(value.toFixed(2)) })}
                            onSlidingComplete={(value) => this._changeDaysSlider(value)}
                            minimumValue={-60}
                            maximumValue={-1}
                            step={1}
                            minimumTrackTintColor={'#368fff'}
                            animateTransitions={true}
                        />
                        <Text style={styles.numberStyle}>{Math.abs(this.state.days)} days</Text>
                        {this._renderCalculate1rm(this.props.r2)}
                    </View>
                </View>
            )
        } else {
            return (
                <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                    <Text style={[{marginBottom: 20}, styles.titleText]}>Estimated One-Rep Max</Text>
                    {this._render1rm(this.props.r2)}
                    <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
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
                            value={this.props.days * -1} 
                            onValueChange={(value) => this.setState({ slidingDays: true, days: Number(value.toFixed(2)) })}
                            onSlidingComplete={(value) => this._changeDaysSlider(value)}
                            minimumValue={-60}
                            maximumValue={-1}
                            step={1}
                            thumbTintColor={'#368fff'}
                            minimumTrackTintColor={'#368fff'}
                            animateTransitions={true}
                        />
                        <Text style={styles.numberStyle}>{Math.abs(this.state.days)} days</Text>
                        {this._renderCalculate1rm(this.props.r2)}
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
        marginTop: 10,
        marginBottom: 5,
        fontSize: 32, 
        textAlign: 'center'
    },
    r2Text: {
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
    field: {
        backgroundColor: 'rgba(239, 239, 239, 1)',
        borderColor: 'rgba(239, 239, 239, 1)',
        borderWidth: 3,
        borderRadius: 3,
        marginBottom: 5,
        zIndex: 2,
        minHeight: 35,
    },
    fieldDetails: {
        position: 'absolute',
        right: 5,
        top: -1,
        bottom: 0,
        justifyContent: 'center',
    },
    fieldText: {
        height: 29,
        fontSize: 13,
        paddingLeft: 4,
        paddingTop: 4,
        paddingBottom: 5,
        paddingRight: 30,
        color: 'rgba(77, 77, 77, 1)',
    },
    tagText: {
        height: 29,
        paddingTop: 6,
        paddingLeft: 4,
        fontSize: 13,
        paddingRight: 30,
        color: 'rgba(77, 77, 77, 1)',
    },
    tagField: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        minHeight: 29,
        paddingLeft: 2,
        paddingRight: 0,
    },
    placeholderText: {
        color: 'rgba(189, 189, 189, 1)'
    },
    button: {
        backgroundColor: 'rgba(47, 128, 237, 1)',
        borderColor: 'rgba(47, 128, 237, 1)',        
        borderWidth: 5,
        borderRadius: 15,
    },
    disabledButton: {
        backgroundColor: 'rgba(47, 128, 237, 1)',
        borderColor: 'rgba(47, 128, 237, 1)',        
        borderWidth: 5,
        borderRadius: 15,
        opacity: 0.3
    },
    buttonText: {
        color: 'white',
        padding: 5,
        textAlign: 'center'
    },
});

export default OneRMView;
