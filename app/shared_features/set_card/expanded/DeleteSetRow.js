import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class DeleteSetRow extends PureComponent {

    _onPressDelete() {
        this.props.onPressDelete();
    }

    render() {
        
        return (
            <View style={[styles.border, {flex:1, alignItems:'stretch', backgroundColor:'white'}]}>
                <TouchableOpacity style={{flex:1}} onPress={ () => this._onPressDelete() } >
                    <View style={styles.bar}>
                        <Text style={{color: 'red'}}>Delete Set</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    border: {
        borderColor: '#e0e0e0',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
    },
    bar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'stretch',
        left: 0,
        right: 0,
        bottom: 0,
        height: 40,
        padding: 0,
        marginRight: 15,
        overflow: 'hidden'
    },
    data: {
        width: 45,
        textAlign: 'center',
        color: 'rgba(77, 77, 77, 1)',
    },
    removedData: {
        width: 45,
        textAlign: 'center',
        color: 'lightgray'
    }
});

export default DeleteSetRow;
