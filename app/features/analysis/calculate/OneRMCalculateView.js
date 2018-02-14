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
import AnalysisModal from 'app/shared_features/analysis_modal/AnalysisModal';
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

    _renderInfoModal() {
        const title = "What is e1RM?";
        const body = "- The estimated One-Rep Max calculation is based on the first rep of each set of a given exercise, within a specified date range, and extrapolated to the lowest velocity at which you think you can successfully complete a one rep max. \n \n - This estimate is provided with a confidence margin which is influenced by several factors explained below. While outliers sometimes occur naturally, the key to a high confidence rating is recording set information as fully and accurately as possible."
        
        return (
            <AnalysisModal 
                title={title}
                body={body}
                isModalShowing={this.props.isInfoModalShowing} 
                closeModal={this.props.dismissInfoModal}
            />
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
                    <ExercisePicker />  
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
            <View>
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
                    thumbTintColor={thumbTintColor}
                    minimumTrackTintColor={'#368fff'}
                    animateTransitions={true}
                />
                <Text style={styles.numberStyle}>{Math.abs(this.state.days)} days</Text>
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
                    thumbTintColor={thumbTintColor}
                    minimumTrackTintColor={'#368fff'}
                    animateTransitions={true}
                />
                <Text style={styles.numberStyle}>{this.state.velocity} m/s</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                    <Text style={[{marginBottom: 15}, styles.titleText]}>Estimated One-Rep Max</Text>
                    <TouchableOpacity style={{alignItems: 'center'}} onPress={ () => this.props.showInfoModal() }>
                        <Text style= {[SETTINGS_PANEL_STYLES.tappableText, { marginBottom: 5 }]} >What is e1rm?</Text>
                    </TouchableOpacity>
                    {this._renderInfoModal()}
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
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
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
});

export default OneRMView;
