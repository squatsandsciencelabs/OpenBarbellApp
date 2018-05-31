import React, { Component } from 'react';
import {
    Text,
    TextInput,
    StyleSheet,
    View,
    TouchableOpacity,
    Platform,
    TouchableHighlight,
    Modal,
    StatusBar,
    Switch,
    ScrollView,
} from 'react-native';
import { Slider } from 'react-native';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';
import EditHistoryFilterTagsToIncludeScreen from './tags/tagsToInclude/EditHistoryFilterTagsToIncludeScreen';
import EditHistoryFilterTagsToExcludeScreen from './tags/tagsToExclude/EditHistoryFilterTagsToExcludeScreen';
import EditHistoryFilterExerciseScreen from './exercise_name/EditHistoryFilterExerciseScreen';
import EditFilterStartDateScreen from './dateRange/startDate/EditHistoryFilterStartScreen';
import EditFilterEndDateScreen from './dateRange/endDate/EditHistoryFilterEndScreen';
import Pill from 'app/shared_features/pill/Pill';
import * as Device from 'app/utility/Device';
import Icon from 'react-native-vector-icons/FontAwesome';
import EditHistoryFilterStartDateScreen from './dateRange/startDate/EditHistoryFilterStartScreen';
import EditHistoryFilterEndDateScreen from './dateRange/endDate/EditHistoryFilterEndScreen';

class EditHistoryFilterView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showRemoved: false
        };
    }

    _close() {
        this.props.closeModal();
    }

    // RENDER

    _displayTagsToInclude() {
        if (this.props.tagsToInclude === undefined || this.props.tagsToInclude === null || this.props.tagsToInclude.length === 0) {
            return (<Text style={[styles.tagText, styles.placeholderText]}>Tags</Text>);
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
            return (<Text style={[styles.tagText, styles.placeholderText]}>Tags</Text>);
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

    _renderExercise() {
        if (this.props.exercise === null || this.props.exercise === '') {
            return (<Text style={[styles.fieldText, styles.placeholderText]}>Exercise</Text>);
        }
        return (<Text style={styles.fieldText}>{this.props.exercise}</Text>);
    }

    _renderStartDateDisplay() {
        if (this.props.startDate === null || this.props.startDate === '') {
            return (<Text style={[styles.fieldText, styles.placeholderText]}>from</Text>);
        }
        
        return (<Text style={styles.fieldText}>{this.props.startDate}</Text>);
    }

    _renderEndDateDisplay() {
        if (this.props.endDate === null || this.props.endDate === '') {
            return (<Text style={[styles.fieldText, styles.placeholderText]}>to</Text>);
        }
        return (<Text style={styles.fieldText}>{this.props.endDate}</Text>);
    }


    _renderStartDate() {
        const width = Device.isSmallDevice() ? 125 : 150;

        return (
            <View style={[styles.field, { width: width }]}>
                <TouchableHighlight onPress={() => this.props.tappedStartDate()} underlayColor='#e0e0e0'>
                    {this._renderStartDateDisplay()}
                </TouchableHighlight>
                <View style={styles.fieldDetails}>
                    <TouchableOpacity onPress={() => this.props.clearStartDate()}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Icon name="times-circle" size={15} color="gray" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _renderEndDate() {
        const width = Device.isSmallDevice() ? 125 : 150;

        return (
            <View style={[styles.field, { width: width }]}>
                <TouchableHighlight onPress={() => this.props.tappedEndDate()} underlayColor='#e0e0e0'>
                    {this._renderEndDateDisplay()}
                </TouchableHighlight>
                <View style={styles.fieldDetails}>
                    <TouchableOpacity onPress={() => this.props.clearEndDate()}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Icon name="times-circle" size={15} color="gray" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _renderDateRange() {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                {this._renderStartDate()}
                {this._renderEndDate()}
            </View>
        );
    }

    _renderTextField(placeholder, value, onChangeText) {
        const width = Device.isSmallDevice() ? 125 : 150;

        return (
            <View style={[styles.field, { width: width }]}>
                <TextInput
                    style={styles.fieldText}
                    keyboardType={'numeric'}
                    underlineColorAndroid={'transparent'}
                    editable = {true}
                    placeholder={placeholder}
                    placeholderTextColor={'rgba(189, 189, 189, 1)'}
                    value = {value}
                    onChangeText={(text) => onChangeText(text)}
                />
            </View>
        );
    }

    _displayMetric(metric) {
        if (metric === 'kgs') {
            return "KGs";
        } else if (metric === 'lbs') {
            return "LBs";
        }
    }

    _toggleMetric(range) {
        if (range === 'min') {
            this.props.toggleStartWeightMetric();
        } else if (range === 'max') {
            this.props.toggleEndWeightMetric();
        }
    }

    _renderWeightField(range, value, onChangeText, metric) {
        const width = Device.isSmallDevice() ? 125 : 150;

        return (
            <View style={[styles.field, { width: width }]}>
                <TextInput
                    style={styles.fieldText}
                    keyboardType={'numeric'}
                    underlineColorAndroid={'transparent'}
                    editable = {true}
                    placeholder={range}
                    placeholderTextColor={'rgba(189, 189, 189, 1)'}
                    value = {value}
                    onChangeText={(text) => onChangeText(text)}
                />
                <View style={styles.fieldDetails}>
                    <TouchableOpacity onPress={() => this._toggleMetric(range)}>
                        <View style={{flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={styles.detailText}>{this._displayMetric(metric)} </Text>
                            <Icon name="refresh" size={10} color="gray" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _renderStartingRepRange() {
        return this._renderTextField('min', this.props.startingRepRange, this.props.updateStartingRepRange)
    }

    _renderEndingRepRange() {
        return this._renderTextField('max', this.props.endingRepRange, this.props.updateEndingRepRange);
    }

    _renderRepRange() {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                {this._renderStartingRepRange()}
                {this._renderEndingRepRange()}
            </View>
        );        
    }

    _renderStartingRPE() {
        return this._renderTextField('min', this.props.startRPE, this.props.updateStartRPE);
    }

    _renderEndingRPE() {
        return this._renderTextField('max', this.props.endRPE, this.props.updateEndRPE);
    }


    _renderRPERange() {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                {this._renderStartingRPE()}
                {this._renderEndingRPE()}
            </View>
        );
    }

    _renderStartWeight() {
        return (
            this._renderWeightField('min', this.props.startWeight, this.props.updateStartWeight, this.props.startWeightMetric)
        );
    }

    _renderEndWeight() {
        return (
            this._renderWeightField('max', this.props.endWeight, this.props.updateEndWeight, this.props.endWeightMetric)
        );
    }

    _renderWeightRange() {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                {this._renderStartWeight()}
                {this._renderEndWeight()}
            </View>
        );
    }

    _renderRemovedSwitch() {
        if (Platform.OS === 'ios') {
            return (
                <Switch
                    style={{backgroundColor: 'white', marginLeft: 20, marginRight: 5}}
                    value={this.state.showRemoved}
                    onValueChange={(isSwitchOn) => this.setState({showRemoved: isSwitchOn})}
                    onTintColor='rgba(47, 128, 237, 1)'
                    thumbTintColor='#e0e0e0'
                    tintColor='rgba(47, 128, 237, 1)'/>
            );
        } else {
            return (
                <Switch
                    value={this.state.showRemoved}
                    onValueChange={(isSwitchOn) =>  this.setState({showRemoved: isSwitchOn})}
                    onTintColor='rgba(47, 128, 237, 1)'
                    thumbTintColor='#e0e0e0'
                    tintColor='rgba(47, 128, 237, 1)'/>
            );
        }
    }

    _renderForms() {
        return (
            <View>
                <View>
                    <Text style={[styles.labelText, {marginTop: 20}]}>Exercise Names Containing</Text>
                    <View style={{padding: 5, paddingLeft: 20, paddingRight: 20}}>
                        <View style={[styles.field, {flex: 1}]}>
                            <TouchableHighlight onPress={() => this.props.tappedExercise()} underlayColor='#e0e0e0'>
                                {this._renderExercise()}
                            </TouchableHighlight>
                        </View>
                    </View>
                    <Text style={styles.labelText}>Tags to Include:</Text>
                    <View style={{padding: 5, paddingLeft: 20, paddingRight: 20}}>{ this._renderTagsToInclude() }</View>
                    <Text style={styles.labelText}>Tags to Exclude:</Text>
                    <View style={{padding: 5, paddingLeft: 18, paddingRight: 18}}>{ this._renderTagsToExclude() }</View>
                    <Text style={styles.labelText}>Date Range:</Text>
                    <View style={{padding: 5}}>{ this._renderDateRange() }</View>
                    <Text style={[styles.labelText, { paddingTop: 10 }]}>Weight Range:</Text>
                    <View style={{padding: 5}}>{ this._renderWeightRange() }</View>
                    <Text style={[styles.labelText, { paddingTop: 10 }]}>RPE Range:</Text>
                    <View style={{padding: 5}}>{ this._renderRPERange() }</View>
                    <Text style={[styles.labelText, { paddingTop: 10 }]}>Rep Range:</Text>
                    <View style={{padding: 5}}>{ this._renderRepRange() }</View>
                    <Text style={[styles.labelText, { paddingTop: 10 }]}>Show deleted sets and reps</Text>
                    <View style={{padding: 5}}>{this._renderRemovedSwitch()}</View>
                    <TouchableOpacity onPress={() => this.props.clear()}>
                        <Text style={styles.clearButton}>Clear all</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                    <EditHistoryFilterExerciseScreen />
                    <EditHistoryFilterTagsToIncludeScreen />
                    <EditHistoryFilterTagsToExcludeScreen />
                    <EditHistoryFilterStartDateScreen />
                    <EditHistoryFilterEndDateScreen />
                </View>
            </View>
        );
    }

    _renderNavigation() {
        if (Device.isiPhoneX()) {
            var statusBar = (
                <View>
                    <StatusBar
                        backgroundColor="white"
                        barStyle="dark-content"
                    />
                </View>
            );
        } else if (Platform.OS === 'ios') {
            var statusBar = (<View style={{height: 20, width: 9001, backgroundColor: 'black'}}></View>);
        } else {
            var statusBar = null;
        }

        return (
            <View style={styles.container}>
                { statusBar }

                <View style={{position: 'absolute', left: 0, top: 0}}>
                    <TouchableOpacity onPress={() => this.props.closeModal()}>
                        <View style={styles.nav}>
                            <Text style={[{color: 'rgba(47, 128, 237, 1)'}]}>X</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.navTitle}>
                    <Text style={styles.titleText}>FILTERS</Text>
                </View>

                <View style={{position: 'absolute', right: 0, top: 0}}>
                    <TouchableOpacity onPress={() => this.props.save() }>
                        <View style={styles.nav}>
                            <Text style={[{color: 'rgba(47, 128, 237, 1)'}]}>Apply</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return (
            <Modal visible={this.props.isModalShowing} animationType='fade'>
                    <View style={{flex: 1, paddingTop: Device.isiPhoneX() ? 40 : 0, flexDirection: 'column' }}>
                        {this._renderNavigation()}
                        <ScrollView style={{flex: 1, backgroundColor: 'rgba(242, 242, 242, 0)'}}>
                            {this._renderForms()}
                        </ScrollView>
                    </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    textField: {
        height: 35,
        margin: 10,
        color: 'rgba(77, 77, 77, 1)',
        fontSize: 14,
        paddingBottom: Platform.os === 'ios' ? 0 : 10,
    },
    container: {
        height: Platform.OS === 'ios' && !Device.isiPhoneX() ? 70 : 50,
        alignItems: 'center'
    },
    nav: {
        paddingTop: Platform.OS === 'ios' && !Device.isiPhoneX() ? 35 : 15,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10
    },
    navTitle: {
        paddingTop: 15,
    },
    addText: {
        color: 'white'
    },
    titleText: {
        color: 'rgba(77, 77, 77, 1)',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    labelText: {
        color: 'rgba(77, 77, 77, 1)',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 25,
    },
    numberStyle: {
        fontSize: 16,
        color: 'rgba(77, 77, 77, 1)',
    },
    detailText: {
        fontSize: 13,
        color: 'gray',
        backgroundColor: 'rgba(0, 0, 0, 0)'
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
    clearButton: {
        textAlign: 'center', 
        fontSize: 15, 
        marginTop: 20,
        paddingBottom: 50,
        color: 'rgba(47, 128, 237, 1)',
    }
});

export default EditHistoryFilterView;
