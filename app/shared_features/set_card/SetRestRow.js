import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

// TODO: this shouldn't use item directly, should instead be passed in the individual values it needs

class SetRestRow extends PureComponent {

    render() {
        if (this.props.item.hasOwnProperty('isWorkingSet') && this.props.item.isWorkingSet) {
            var marginTop = 15;
            var marginBottom = 15;
        } else if (this.props.item.isCollapsed) {
            var marginTop = 0;
            var marginBottom = 15;
        } else {
            var marginTop = 15;
            var marginBottom = 0;
        }

        return (
            <View style={[styles.border, {flex:1, flexDirection: 'row', alignItems:'stretch', backgroundColor:'white'}]}>
                <Text style={{flex: 1, textAlign: 'center', color: 'gray', marginBottom: marginBottom, marginTop: marginTop}}>{ this.props.item.rest }</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    border: {
        borderColor: '#e0e0e0',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 0,
    },
});

export default SetRestRow;
