import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Platform,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

class SetTitleRowCollapsed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            setNumber: this.props.setNumber,
            exercise: this.props.exercise,
            removed: this.props.removed,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            setNumber: nextProps.setNumber,
            exercise: nextProps.exercise,
            removed: nextProps.removed,
        });
    }

    _renderExercise() {
        if (this.state.exercise === null || this.state.exercise === '') {
            return (<Text style={[styles.fieldText, styles.placeholderText]}>Exercise</Text>);
        }
        return (<Text style={styles.fieldText}>{this.state.exercise}</Text>);
    }

    _renderSetNumber() {
        if (this.state.removed) {
            return null;
        }
        if (this.state.setNumber === null || this.state.setNumber === undefined) {
            return '#1';
        }
        return '#' + this.state.setNumber;
    }

    _renderChevron() {
        return (
            <View style={{backgroundColor: 'white', marginLeft: 50, marginTop: 5, marginBottom: 10}}>
                <Icon name="chevron-with-circle-up" size={20} color='rgba(170, 170, 170, 1)' />
            </View>
        );
    }

    render() {
        return (
            <View style={[styles.container, styles.borderAllRound]}>
                <View style={[styles.field, {flex: 1}]}>
                    {this._renderExercise()}
                    <View style={styles.fieldDetails} pointerEvents='none'>
                        <Text style={styles.detailText}>{this._renderSetNumber()}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.props.tapExpand(this.props.setID)}>
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
        paddingTop: 10,
        paddingRight: 10,
        flex: 1,
        flexDirection: 'row',
    },
    field: {
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 3,
        marginBottom: 5,
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
    borderPartial: {
        borderColor: '#e0e0e0',
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    borderAllRound: {
        borderColor: '#e0e0e0',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
    }
});

export default SetTitleRowCollapsed;
