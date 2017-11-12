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
            <TouchableOpacity style={{position: 'absolute', right: 10, top: 15}}
                onPress={() => this.props.tapExpand(this.props.setID)}>            
                    <View>
                        <Icon name="chevron-with-circle-up" size={20} color='rgba(170, 170, 170, 1)' />
                    </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={[styles.container, styles.border]}>
                {this._renderExercise()}
                <Text style={styles.detailText}> {this._renderSetNumber()}</Text>
                {this._renderChevron()}
            </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingLeft: 12,
        paddingRight: 10,        
        paddingTop: 15,
        paddingBottom: 15,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fieldText: {
        fontSize: 17,
        color: 'rgba(77, 77, 77, 1)',
        fontWeight: 'bold',
    },
    detailText: {
        fontSize: 17,
        color: 'gray',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        fontWeight: 'bold',
    },
    placeholderText: {
        color: 'rgba(189, 189, 189, 1)'
    },
    border: {
        borderColor: '#e0e0e0',
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
});

export default SetTitleRowCollapsed;
