// app/components/SetRest.js

import React, {PureComponent} from 'react';
import { View, StyleSheet, Text } from 'react-native';

class SetRest extends PureComponent {

    render() {
        return (
			<View style={[styles.shadow, {flex:1, flexDirection: 'row', alignItems:'stretch', backgroundColor:'white'}]}>
				<Text style={{flex: 1, textAlign: 'center', marginTop: 15, color: 'gray', marginBottom: 15}}>{ this.props.item.rest }</Text>
			</View>
		);
    }

}

const styles = StyleSheet.create({
    shadow: {
		shadowColor: "#000000",
		shadowOpacity: 0.2,
		shadowRadius: 2,
		shadowOffset: {
			height: 4,
			width: 0
		},
	},
});

export default SetRest;
