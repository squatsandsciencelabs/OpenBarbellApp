// NOTE: this is one of the places where I'm using internal state rather than redux global state
// reason for doing so is because this intended to be used multiple times in a giant listview
// it's therefore easier to keep the state attached to the component rather than build a giant array in redux

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    Keyboard,
    Platform,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Pill from 'app/shared_features/pill/Pill';

class SetForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tags: this.props.tags,
            weight: this.props.weight,
            didChangeWeight: false,
            metric: this.props.metric,
            rpe: this.props.rpe,
            didChangeRPE: false,
            removed: this.props.removed,
        };
    }

    // this uses didChange flags to prevent overwriting of values while you're still typing while still allowing sync to update it
    componentWillReceiveProps(nextProps) {
        this.setState({
            tags: nextProps.tags,
            weight: this.state.didChangeWeight ? this.state.weight : nextProps.weight,
            didChangeWeight: false,
            metric: nextProps.metric,
            rpe: this.state.didChangeRPE ? this.state.rpe : nextProps.rpe,
            didChangeRPE: false,
            removed: nextProps.removed
        });
    }

    // KEYBOARD

    componentWillMount() {
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { this._keyboardDidHide() });
    }

    componentWillUnmount() {
        this._save();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidHide() {
        this._save();
    }

    _onChangeWeight(weight) {
        this.setState({
            weight: weight,
            didChangeWeight: true
        });
    }

    _onChangeRPE(rpe) {
        this.setState({
            rpe: rpe,
            didChangeRPE: true
        });
    }

    _tapDisabledRPE() {
        Alert.alert(
            'RPE Disabled',
            "It has been too long since this set to log RPE.",
            [
                {text: 'Close', style: 'cancel'},
            ]
        );
    }

    _onEndEditWeight() {
        this._save();
        this.props.dismissWeight(this.props.setID);
    }

    _onEndEditRPE() {
        this._save();
        this.props.dismissRPE(this.props.setID);
    }

    // SAVING

    componentDidUpdate(nextProps, nextState) {
        if (nextState.metric !== this.state.metric) {
            this._save();
        }
    }

    _save() {
        if (this.props.weight !== this.state.weight
            || this.props.metric !== this.state.metric
            || this.props.rpe !== this.state.rpe) {
            this.props.saveSet(this.props.setID, this.state.weight, this.state.metric, this.state.rpe);
        }
    }

    _toggleMetric() {
        if (this.state.metric === 'kgs') {
            this.setState({metric: 'lbs'});
            this.props.toggleMetric(this.props.setID);
        } else if (this.state.metric === 'lbs') {
            this.setState({metric: 'kgs'});
            this.props.toggleMetric(this.props.setID);
        }
    }

    // RENDER

    _displayTags() {
        if (this.state.tags === undefined || this.state.tags === null || this.state.tags.length === 0) {
            return (<Text style={[styles.tagText, styles.placeholderText]}>Tags</Text>);
        }

        var pills = [];
        let position = 0;
        this.state.tags.map((tag) => {
            let key = position;
            pills.push(
                <Pill key={key} text={tag} style={{paddingRight: 5, paddingBottom: 3, paddingTop: 3}} />
            );
            position++;
        });

        return (<View style={styles.tagField}>{pills}</View>);
    }

    _displayMetric() {
        if (this.state.metric === 'kgs') {
            return "KGs";
        } else if (this.state.metric === 'lbs') {
            return "LBs";
        }
    }

    _renderWeight() {
        return (
            <View style={[styles.field, {flex: 3, marginRight: 5}]}>
                <TextInput
                    style={styles.fieldText}
                    keyboardType={'numeric'}
                    underlineColorAndroid={'transparent'}
                    editable = {true}
                    placeholder="Weight"
                    placeholderTextColor={'rgba(189, 189, 189, 1)'}
                    value={this.state.weight}

                    onEndEditing={() => this._onEndEditWeight() }
                    onFocus={() => this.props.tapWeight(this.props.setID) }
                    onChangeText={(weight) => this._onChangeWeight(weight) }
                />
                <View style={styles.fieldDetails}>
                    <TouchableOpacity onPress={() => this._toggleMetric()}>
                        <View style={{flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={styles.detailText}>{this._displayMetric()} </Text>
                            <Icon name="refresh" size={10} color="gray" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _renderRPE() {
        if (this.props.rpeDisabled) {
            return (
                <View style={[styles.field, {flex: 2}]}>
                    <TouchableOpacity onPress={() => this._tapDisabledRPE()}>
                        <TextInput
                            style={styles.fieldText}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'transparent'}
                            editable = {false}
                            placeholder="RPE"
                            placeholderTextColor={'rgba(189, 189, 189, 1)'}
                            value = {this.state.rpe}   
                            pointerEvents='none'
                        />
                        <View style={styles.fieldDetails} pointerEvents='none'>
                            <Text style={styles.detailText}>RPE</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={[styles.field, {flex: 2}]}>
                    <TextInput
                        style={styles.fieldText}
                        keyboardType={'numeric'}
                        underlineColorAndroid={'transparent'}
                        editable = {true}
                        placeholder="RPE"
                        onEndEditing={() => this._onEndEditRPE() }
                        placeholderTextColor={'rgba(189, 189, 189, 1)'}
                        value = {this.state.rpe}
                        onFocus={() => this.props.tapRPE(this.props.setID) }
                        onChangeText={(rpe) => this._onChangeRPE(rpe) }
                    />
                    <View style={styles.fieldDetails} pointerEvents='none'>
                        <Text style={styles.detailText}>RPE</Text>
                    </View>
                </View>
            );
        }
    }

    _renderTags() {
        return (
            <View style={[styles.field, {flex: 1}]}>
                <TouchableHighlight onPress={() => this.props.tapTags(this.props.setID, this.state.tags)} underlayColor='#e0e0e0'>
                    {this._displayTags()}
                </TouchableHighlight>
            </View>
        );
    }

    render() {
        return (
            <View style={[{flex: 1, flexDirection: 'column'}, styles.border]}>
                <View style={[{flex: 1, flexDirection: 'column', paddingLeft: 12, paddingRight: 12, paddingTop: 0, paddingBottom: 7}]}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flex: 1}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                { this._renderWeight() }
                                { this._renderRPE() }
                            </View>
                            <View>{ this._renderTags() }</View>
                        </View>

                        <View>{ this.props.renderDetailComponent() }</View>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
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
    detailText: {
        fontSize: 13,
        color: 'gray',
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    disabledText: {
        fontSize: 13,
        color: 'rgba(189, 189, 189, 1)',
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    border: {
        borderColor: '#e0e0e0',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
    },
});

export default SetForm;
