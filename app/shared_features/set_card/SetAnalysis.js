import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

class SetAnalysis extends Component {

    render() {
        return (
            <View style={[styles.border, {flex:1, flexDirection: 'row', alignItems:'stretch', backgroundColor:'white'}]}>
                <Text>TODO: analysis goes here</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    border: {
        borderColor: '#e0e0e0',
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
});

export default SetAnalysis;