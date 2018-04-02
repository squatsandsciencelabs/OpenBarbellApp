import React, { Component } from 'react';
import {
    Text,
    TextInput,
    StyleSheet,
    View,
    TouchableOpacity,
    Platform,
    TouchableHighlight,
    Image,
    Modal,
} from 'react-native';
import { Slider } from 'react-native';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';
import EditHistoryFilterTagsToIncludeScreen from './tags/tagsToInclude/EditHistoryFilterTagsToIncludeScreen';
import EditHistoryFilterTagsToExcludeScreen from './tags/tagsToExclude/EditHistoryFilterTagsToExcludeScreen';
import EditHistoryExerciseScreen from './exercise_name/EditHistoryFilterExerciseScreen';
import EditFilterStartDateScreen from './dateRange/startDate/EditHistoryFilterStartScreen';
import EditFilterEndDateScreen from './dateRange/endDate/EditHistoryFilterEndScreen';
import Pill from 'app/shared_features/pill/Pill';
import * as Device from 'app/utility/Device';
import Icon from 'react-native-vector-icons/FontAwesome';
import EditHistoryFilterStartDateScreen from './dateRange/startDate/EditHistoryFilterStartScreen';
import EditHistoryFilterEndDateScreen from './dateRange/endDate/EditHistoryFilterEndScreen';

class EditHistoryFilterView extends Component {

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
    };

    _renderExercise() {
        if (this.props.exercise === null || this.props.exercise === '') {
            return (<Text style={[styles.fieldText, styles.placeholderText]}>Exercise</Text>);
        }
        return (<Text style={styles.fieldText}>{this.props.exercise}</Text>);
    };

    _renderStartDate() {
        return <EditHistoryFilterStartDateScreen />
    };

    _renderEndDate() {
        return (
            <EditHistoryFilterEndDateScreen />
        );
    };

    _renderDateRange() {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                {this._renderStartDate()}
                {this._renderEndDate()}
            </View>
        );
    };

    _renderTextField(placeholder, value, onChangeText) {
        return (
            <View style={[styles.field, { width: 150 }]}>
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
    };

    _renderStartingRepRange() {
        return this._renderTextField('min', this.props.startingRepRange, this.props.updateStartingRepRange)
    };

    _renderEndingRepRange() {
        return this._renderTextField('max', this.props.endingRepRange, this.props.updateEndingRepRange);
    };

    _renderRepRange() {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                {this._renderStartingRepRange()}
                {this._renderEndingRepRange()}
            </View>
        );        
    };

    _renderStartingRPE() {
        return this._renderTextField('min', this.props.startRPE, this.props.updateStartRPE);
    };

    _renderEndingRPE() {
        return this._renderTextField('max', this.props.endRPE, this.props.updateEndRPE);
    };


    _renderRPERange() {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                {this._renderStartingRPE()}
                {this._renderEndingRPE()}
            </View>
        );
    };

    _renderStartWeight() {
        return this._renderTextField('min', this.props.startWeight, this.props.updateStartWeight);
    };

    _renderEndWeight() {
        return this._renderTextField('max', this.props.endWeight, this.props.updateEndWeight);
    };

    _renderWeightRange() {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableHighlight onPress={() => this.props.tappedStartDate()} underlayColor='#e0e0e0'>
                    {this._renderStartWeight()}
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.tappedEndDate()} underlayColor='#e0e0e0'>
                    {this._renderEndWeight()}
                </TouchableHighlight>
            </View>
        );
    };

    _renderForms() {
        return (
            <View>
                <View style={{height: 300}}>
                    <Text style={[styles.labelText, {marginTop: 25}]}>Exercise Names Containing</Text>
                    <View style={{padding: 5, paddingLeft: 20, paddingRight: 20}}>
                        <View style={[styles.field, {flex: 1}]}>
                            <TouchableHighlight onPress={() => this.props.tappedExercise()} underlayColor='#e0e0e0'>
                                {this._renderExercise()}
                            </TouchableHighlight>
                        </View>
                    </View>
                    <Text style={[styles.labelText, {marginTop: 35}]}>Tags Must Include:</Text>
                    <View style={{padding: 5, paddingLeft: 20, paddingRight: 20}}>{ this._renderTagsToInclude() }</View>
                    <Text style={[styles.labelText, {marginTop: 35}]}>Tags to Exclude:</Text>
                    <View style={{padding: 5, paddingLeft: 18, paddingRight: 18}}>{ this._renderTagsToExclude() }</View>
                    <Text style={[styles.labelText, {marginTop: 35}]}>Date Range:</Text>
                    <View style={{padding: 5}}>{ this._renderDateRange() }</View>
                    <Text style={[styles.labelText, {marginTop: 35}]}>Weight Range:</Text>
                    <View style={{padding: 5}}>{ this._renderWeightRange() }</View>
                    <Text style={[styles.labelText, {marginTop: 35}]}>RPE Range:</Text>
                    <View style={{padding: 5}}>{ this._renderRPERange() }</View>
                    <Text style={[styles.labelText, {marginTop: 35}]}>Rep Range:</Text>
                    <View style={{padding: 5}}>{ this._renderRepRange() }</View>
                    <TouchableOpacity onPress={() => this.props.clear()}>
                        <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 60, color: 'rgba(47, 128, 237, 1)' }}>Clear all</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                    <EditHistoryExerciseScreen />
                    <EditHistoryFilterTagsToIncludeScreen />
                    <EditHistoryFilterTagsToExcludeScreen />
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
                <View style={{flex: 1, paddingTop: Device.isiPhoneX() ? 40 : 0, flexDirection: 'column', backgroundColor: 'rgba(242, 242, 242, 0)'}}>
                    {this._renderNavigation()}
                    {this._renderForms()}
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
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(47, 128, 237, 1)',
        borderRadius: 5
    },
    disabled: {
        opacity: 0.3
    },
    addText: {
        color: 'white'
    },
    rowBorders: {
        borderColor: '#e0e0e0',
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    titleText: {
        color: 'rgba(77, 77, 77, 1)',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
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
    dropdownButton: {
        backgroundColor: 'rgba(47, 128, 237, 1)',
        borderRadius: 3,
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

export default EditHistoryFilterView;
