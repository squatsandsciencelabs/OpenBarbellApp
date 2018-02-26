import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class DeleteSetRow extends PureComponent {

    _onPressDelete() {
        this.props.onPressDelete();
    }

    render() {
        return (
            <View style={[styles.border, {flex:1, alignItems:'stretch', backgroundColor:'white', marginBottom: 15}]}>
                <TouchableOpacity style={{flex:1}} onPress={ () => this._onPressDelete() } >
                    <Text style={styles.text}>Delete Set</Text>
                </TouchableOpacity>
            </View>
        );
    }

};

const styles = StyleSheet.create({
    border: {
        borderColor: '#e0e0e0',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
    },
    text: {
        color: 'red',
        textAlign: 'right',
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 10,
    },
});

export default DeleteSetRow;
