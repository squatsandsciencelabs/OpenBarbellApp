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
import Pill from 'app/shared_features/pill/Pill';
import * as Device from 'app/utility/Device';
import Icon from 'react-native-vector-icons/FontAwesome';

class EditHistoryFilterView extends Component {

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

    _renderForms() {
        if (Platform.OS === 'ios') {
            return (
                <View>
                    <View>
                        <TouchableOpacity onPress={() => this._tappedExercise()} style={[SETTINGS_PANEL_STYLES.blueButton, {flex: 1, marginBottom: 20}]}>
                            <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>
                                {this.props.exercise}
                            </Text>
                            <Icon name="caret-down" size={10} color='white' style={{right: 5, position:'absolute'}} />
                        </TouchableOpacity>
                        <Text style={styles.labelText}>Tags Must Include:</Text>
                        <View style={{marginTop: 5, marginBottom: 10}}>{ this._renderTagsToInclude() }</View>
                        <Text style={styles.labelText}>Tags to Exclude:</Text>
                        <View style={{marginTop: 5}}>{ this._renderTagsToExclude() }</View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                    </View>
                </View>
            );
        } else {
            return (
                <View>
                    <Text style={styles.labelText}>Tags Must Include:</Text>
                    <View style={{marginTop: 5, marginBottom: 10}}>{ this._renderTagsToInclude() }</View>
                    <Text style={styles.labelText}>Tags to Exclude:</Text>
                    <View style={{marginTop: 5}}>{ this._renderTagsToExclude() }</View>
                    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', marginBottom: 0 }}>
                    </View>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                    <Text style={[{marginBottom: 25}, styles.titleText]}>Filters</Text>
                    {this._renderForms()}
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
        textAlign: 'left',
        marginBottom: 0,
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
    slider: {
        marginTop: Platform.OS === 'ios' ? -5 : 10
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
