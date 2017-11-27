import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Platform,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

class SetTitleRowExpanded extends Component {

    _renderExercise() {
        if (this.props.exercise === null || this.props.exercise === '') {
            return (<Text style={[styles.fieldText, styles.placeholderText]}>Exercise</Text>);
        }
        return (<Text style={styles.fieldText}>{this.props.exercise}</Text>);
    }

    _renderSetNumber() {
        if (this.props.removed) {
            return null;
        }
        if (this.props.setNumber === null || this.props.setNumber === undefined) {
            return '#1';
        }
        return '#' + this.props.setNumber;
    }

    _renderChevron() {
        if (this.props.isCollapsable) {
            return (
                <View>
                    <Icon name="chevron-with-circle-up" size={20} color='rgba(170, 170, 170, 1)' />
                </View>
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <View style={[styles.container, styles.border]}>
                <View style={[styles.field, {flex: 1}]}>
                    <TouchableHighlight onPress={() => this.props.tappedExercise(this.props.setID, this.props.exercise, this.props.bias)} underlayColor='#e0e0e0'>
                        {this._renderExercise()}
                    </TouchableHighlight>
                    <View style={styles.fieldDetails} pointerEvents='none'>
                        <Text style={styles.detailText}>{this._renderSetNumber()}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.chevronContainer} onPress={() => this.props.tappedCollapse(this.props.setID)}>
                    {this._renderChevron()}
                </TouchableOpacity>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingLeft: 12,
        flex: 1,
        flexDirection: 'row',
    },
    field: {
        backgroundColor: 'rgba(239, 239, 239, 1)',
        borderColor: 'rgba(239, 239, 239, 1)',
        borderWidth: 3,
        borderRadius: 3,
        marginBottom: 5,
        marginTop: 10,
        marginRight: 52,
        zIndex: 2,
        minHeight: 35,
    },
    fieldText: {
        height: 29,
        paddingTop: 6,
        paddingLeft: 4,
        fontSize: 13,
        paddingRight: 30,
        color: 'rgba(77, 77, 77, 1)',
    },
    fieldDetails: {
        position: 'absolute',
        right: 5,
        top: -1,
        bottom: 0,
        justifyContent: 'center',
    },
    detailText: {
        fontSize: 13,
        color: 'gray',
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    placeholderText: {
        color: 'rgba(189, 189, 189, 1)'
    },
    chevronContainer: {
        width: 40,
        height: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    border: {
        borderColor: '#e0e0e0',
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
});

export default SetTitleRowExpanded;
