// app/components/EditSetHeader.js

import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput }  from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class EditSetHeader extends Component {

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={styles.upperShadow} />
                    <View style={[styles.shadow, {flex: 1, flexDirection: 'column', padding: 5}]}>
                        <View style={styles.field}>
                            <TextInput
                                style={styles.fieldText}
                                underlineColorAndroid={'transparent'}
                                editable = {true}
                                maxLength = {40}
                                defaultValue = {'Enter Exercise'}
                            />
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={[styles.field, {flex: 1, marginRight: 5}]}>
                                <TextInput
                                    style={styles.fieldText}
                                    underlineColorAndroid={'transparent'}
                                    editable = {true}
                                    maxLength = {40}
                                    defaultValue = {'500'}
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
                                    underlineColorAndroid={'transparent'}
                                    editable = {true}
                                    maxLength = {40}
                                    value = {'8.5'}
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
        height: 30,
        fontSize: 15
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
