import React, { Component } from 'react';
import {
    Text,
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
import Pill from 'app/shared_features/pill/Pill';
import * as Device from 'app/utility/Device';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        if (!this.props.exercise) {
            return (
                <View>
                    <View style={styles.field}><Text style={[styles.tagText, styles.placeholderText]}>Exercise</Text></View>
                </View>
            );
        }
    };

    _renderStartingDate() {
        if (!this.props.startDate) {
            return (
                <View style={[styles.field, { width: 150 }]}><Text style={[styles.tagText, styles.placeholderText]}>start</Text></View>
            );
        }
    }

    _renderEndingDate() {
        if (!this.props.endDate) {
            return (
                <View style={[styles.field, { width: 150, marginLeft: 10 }]}><Text style={[styles.tagText, styles.placeholderText]}>end</Text></View>
            );
        }
    }

    _renderDateRange() {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                {this._renderStartingDate()}
                {this._renderEndingDate()}
            </View>
        );
    };

    _renderStartingRepRange() {
        if (!this.props.startingRepRange) {
            return (
                <View style={[styles.field, { width: 150 }]}><Text style={[styles.tagText, styles.placeholderText]}>min</Text></View>
            );
        }
    }

    _renderEndingRepRange() {
        if (!this.props.endingRepRange) {
            return (
                <View style={[styles.field, { width: 150, marginLeft: 10 }]}><Text style={[styles.tagText, styles.placeholderText]}>max</Text></View>
            );
        }
    }

    _renderRepRange() {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                {this._renderStartingRepRange()}
                {this._renderEndingRepRange()}
            </View>
        );        
    }

    _renderRPERange() {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={[styles.field, { width: 150 }]}></View>
                <View style={[styles.field, { width: 150, marginLeft: 10 }]}></View>
            </View>
        );
    };

    _renderRepRange() {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                {this._renderStartingRepRange()}
                {this._renderEndingRepRange()}
            </View>
        );
    };

    _renderForms() {
        return (
            <View>
                <View>
                    <Text style={[styles.labelText, {marginTop: 40}]}>Exercise Names Containing</Text>
                    <View style={{padding: 10}}>{this._renderExercise()}</View>
                    <Text style={styles.labelText}>Tags Must Include:</Text>
                    <View style={{padding: 10}}>{ this._renderTagsToInclude() }</View>
                    <Text style={[styles.labelText, {marginTop: 35}]}>Tags to Exclude:</Text>
                    <View style={{padding: 10}}>{ this._renderTagsToExclude() }</View>
                    <Text style={[styles.labelText, {marginTop: 35}]}>Date Range:</Text>
                    <View style={{padding: 10}}>{ this._renderDateRange() }</View>
                    <Text style={[styles.labelText, {marginTop: 35}]}>Rep Range:</Text>
                    <View style={{padding: 10}}>{ this._renderRepRange() }</View>
                    <View style={{ marginTop: 150, fontSize: 40 }}><Text style={{ textAlign: 'center' }}>Clear All</Text></View>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
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
                    <TouchableOpacity onPress={() => this._tappedDone() }>
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
        marginTop: 30,
    },
    labelText: {
        color: 'rgba(77, 77, 77, 1)',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 10,
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
