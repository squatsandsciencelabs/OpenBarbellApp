import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

class SetRestRow extends PureComponent {

    render() {
        return (
            <View style={[styles.border, {flex:1, flexDirection: 'row', alignItems:'stretch', backgroundColor:'white'}]}>
                <Text style={{flex: 1, textAlign: 'center', marginTop: 15, color: 'gray', marginBottom: 15}}>{ this.props.item.rest }</Text>
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
});

export default SetRestRow;
