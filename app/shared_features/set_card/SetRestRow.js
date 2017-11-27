import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

// TODO: this shouldn't use item directly, should instead be passed in the individual values it needs

class SetRestRow extends PureComponent {

    render() {
        if (this.props.item.isCollapsed) {
            var margin = 0;
        } else {
            var margin = 15;
        }

        return (
            <View style={[styles.border, {flex:1, flexDirection: 'row', alignItems:'stretch', backgroundColor:'white'}]}>
                <Text style={{flex: 1, textAlign: 'center', color: 'gray', marginBottom: 15, marginTop: margin}}>{ this.props.item.rest }</Text>
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
