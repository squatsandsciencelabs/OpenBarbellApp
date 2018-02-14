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
import ExercisePicker from './exercise/ExercisePicker';
import EditAnalysisTagsToIncludeScreen from './tags/tagsToInclude/EditAnalysisTagsToIncludeScreen';
import EditAnalysisTagsToExcludeScreen from './tags/tagsToExclude/EditAnalysisTagsToExcludeScreen';
import Pill from 'app/shared_features/pill/Pill';
import WhatIsOneRMScreen from './whatis/WhatIsOneRMScreen';
import * as Device from 'app/utility/Device';
import Icon from 'react-native-vector-icons/FontAwesome';

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

    // ACTIONS

    _tappedExercise() {
        this.props.tappedExercise();
    }

    _changeVelocitySlider(value) {
        this.props.changeVelocity(value);
    }

    _changeDaysSlider(value) {
        this.props.changeDays(value);
    }

    // RENDER

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
                    <View>
                        <TouchableOpacity onPress={() => this._tappedExercise()} style={[SETTINGS_PANEL_STYLES.blueButton, {width: 200, height: 35, alignSelf: 'center', marginBottom: 20}]}>
                            <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>
                                {this.props.exercise}
                            </Text>
                            <Icon name="caret-down" size={10} color='white' style={{right: 5, position:'absolute'}} />
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
                    <View style={[{flex: 0.37}, styles.dropdownButton]}><ExercisePicker color={'white'} /></View>
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

    _renderSliders() {
        if (Platform.OS === 'ios') {
            var thumbTintColor = '#ffffff';
        } else {
            var thumbTintColor = '#368fff';
        }

        return (
            <View style={{ marginTop: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>    
                    <Text style={styles.labelText}>
                        Date Range
                    </Text>
                    <Text style={styles.numberStyle}>{Math.abs(this.state.days)} days</Text>
                </View>
                <Slider
                    value={this.props.days * -1} 
                    onValueChange={(value) => this.setState({ slidingDays: true, days: Number(value.toFixed(2)) })}
                    onSlidingComplete={(value) => this._changeDaysSlider(value)}
                    minimumValue={-60}
                    maximumValue={-1}
                    step={1}
                    thumbTintColor={thumbTintColor}
                    minimumTrackTintColor={'#368fff'}
                    animateTransitions={true}
                />
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.labelText}>
                        Velocity
                    </Text>
                    <Text style={styles.numberStyle}>{this.state.velocity} m/s</Text>
                </View>
                <Slider
                    value={this.props.velocity} 
                    onValueChange={(value) => this.setState({ slidingVelocity: true, velocity: Number(value.toFixed(2)) })}
                    onSlidingComplete={(value) => this._changeVelocitySlider(value)}
                    minimumValue={.01}
                    maximumValue={.41}
                    step={.01}
                    thumbTintColor={thumbTintColor}
                    minimumTrackTintColor={'#368fff'}
                    animateTransitions={true}
                />
            </View>
        );
    }

    _renderCalculate1rm() {
        return (
            <View style={[styles.button, {marginTop: 20}]}>
                <TouchableOpacity onPress={ () => this.props.calcE1rm() }>
                    <Text style={styles.buttonText}>Calculate</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                    <Text style={[{marginBottom: 25}, styles.titleText]}>Estimated One-Rep Max</Text>
                    <TouchableOpacity style={{alignItems: 'center', position: 'absolute', right: 0, top: 0}} onPress={ () => this.props.presentInfoModal() }>
                        <Icon name="question-circle" size={25} color='rgba(47, 128, 237, 1)'></Icon>
                    </TouchableOpacity>
                    <WhatIsOneRMScreen />
                    {this._renderForms()}
                    {this._renderSliders()}
                    {this._renderCalculate1rm()}
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
        color: 'rgba(77, 77, 77, 1)',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5
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
    buttonText: {
        color: 'white',
        padding: 5,
        textAlign: 'center'
    },
    dropdownButton: {
        backgroundColor: 'rgba(47, 128, 237, 1)',
        borderRadius: 3,
        marginLeft: 5,
        marginBottom: 5,
        height: 40,
    },
});

export default OneRMView;
