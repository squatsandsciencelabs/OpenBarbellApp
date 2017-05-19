// app/components/EditSetHeader.js

import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class EditSetHeader extends Component {

    constructor(props) {
		super(props);

		this.state = {
            setNumber: this.props.setNumber,
            exercise: this.props.exercise,
            weight: this.props.weight,
            metric: this.props.metric,
            rpe: this.props.rpe
        };
	}

    componentWillMount() {
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', () => { this._keyboardWillShow() });
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => { this._keyboardWillHide() });
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { this._keyboardDidHide() });
    }

    componentWillUnmount() {
        this.keyboardWillShowListener.remove();
        this.keyboardWillHideListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardWillShow() {
        // TODO: scroll to the appropriate position - ios only
    }

    _keyboardWillHide() {
        // TODO: scroll to the appropriate position - ios only
    }

    _keyboardDidHide() {
        if (this.props.exercise !== this.state.exercise
            || this.props.weight !== this.state.weight
            || this.props.metric !== this.state.metric
            || this.props.rpe !== this.state.rpe) {
            // save
            this.props.updateSet(this.props.setID, this.state.exercise, this.state.weight, this.state.metric, this.state.rpe);
        }
    }

    setNumber() {
        if (this.state.setNumber === null || this.state.setNumber === undefined) {
            return '#1';
        }
        return '#' + this.state.setNumber;
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={styles.upperShadow} />
                    <View style={[styles.shadow, {flex: 1, flexDirection: 'column', padding: 5}]}>
                        <View style={styles.field}>
                            <View>
                                <TextInput
                                    style={styles.fieldText}
                                    underlineColorAndroid={'transparent'}
                                    editable = {true}
                                    value = {this.state.exercise}
                                    placeholder="Enter Exercise"
                                    onChangeText={(exercise) => this.setState({exercise: exercise}) }
                                />
                            </View>
                            <View style={styles.fieldDetails} pointerEvents='none'>
                                <Text style={styles.detailText}>{this.setNumber()}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={[styles.field, {flex: 1, marginRight: 5}]}>
                                <TextInput
                                    style={styles.fieldText}
                                    keyboardType={'numeric'}
                                    underlineColorAndroid={'transparent'}
                                    editable = {true}
                                    placeholder="Enter Weight"
                                    onChangeText={(weight) => this.setState({weight: weight}) }
                                />
                                <View style={styles.fieldDetails}>
                                    <TouchableOpacity>
                                        <View style={{flexDirection: 'row', alignItems: 'center', }}>
                                            <Text style={styles.detailText}>LB </Text>
                                            <Icon name="refresh" size={10} color="gray" />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={[styles.field, {flex: 1}]}>
                                <TextInput
                                    style={styles.fieldText}
                                    keyboardType={'numeric'}
                                    underlineColorAndroid={'transparent'}
                                    editable = {true}
                                    placeholder="Enter RPE"
                                    value = {this.state.rpe}
                                    onChangeText={(rpe) => this.setState({rpe: rpe}) }
                                />
                                <View style={styles.fieldDetails} pointerEvents='none'>
                                    <Text style={styles.detailText}>RPE</Text>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.field, {flex: 1}]}>
                            <View style={{height: 30, justifyContent: 'center'}}>
                                <Text>Tags</Text>
                            </View>
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
    },
    fieldDetails: {
        position: 'absolute',
        right: 5,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
    fieldText: {
        height: (Platform.OS === 'ios') ? 30 : 40,
        fontSize: 15,
        paddingRight: 30
    },
    detailText: {
        color: 'gray'
    },
    upperShadow: {
		shadowColor: "#000000",
        shadowRadius: 2,
        shadowOpacity: 1,
        shadowOffset: {
            height: 1,
            weight: 0
        },
        height: 1,
        backgroundColor: 'white'
    },
	shadow: {
		shadowColor: "#000000",
		shadowOpacity: 0.2,
		shadowRadius: 2,
		shadowOffset: {
			height: 4,
			width: 0
		},
	}
});

export default EditSetHeader;
