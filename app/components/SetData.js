// app/components/SetData.js

import React, {PureComponent} from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class SetData extends PureComponent {

    render() {
        var button = null;
		if (this.props.item.removed === false) {
			button = (
				<TouchableHighlight onPress={ () => this.props.onPressRemove() }>
					<Icon name="close" size={20} color="lightgray" style={{marginTop: 10}} />
				</TouchableHighlight>
			);
		} else {
			button = (
				<TouchableHighlight onPress={ () => this.props.onPressRestore() }>
					<Icon name="undo" size={20} color="lightgray" style={{marginTop: 10}} />
				</TouchableHighlight>
			);
		}

		var dataStyle = this.props.item.removed ? styles.removedData : styles.data;
		
		return (
			<View style={[styles.Shadow, {flex:1, flexDirection: 'row', alignItems:'stretch', backgroundColor:'white'}]}>
				<TouchableHighlight style={{flex:1}} onPress={ () => this.props.onPressRow() } activeOpacity={1} >
					<View style={styles.bar}>
						<Text style={dataStyle}> { this.props.item.repDisplay } </Text>
						<Text style={dataStyle}> { this.props.item.averageVelocity } </Text>
						<Text style={dataStyle}> { this.props.item.peakVelocity } </Text>
						<Text style={dataStyle}> { this.props.item.peakVelocityLocation } </Text>
						<Text style={dataStyle}> { this.props.item.rangeOfMotion } </Text>
						<Text style={dataStyle}> { this.props.item.duration } </Text>
					</View>
				</TouchableHighlight>

				{button}
			</View>
		);
    }

}

const styles = StyleSheet.create({
	Shadow: {
		shadowColor: "#000000",
		shadowOpacity: 0.2,
		shadowRadius: 2,
		shadowOffset: {
			height: 4,
			width: 0
		},
	},
	bar: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'stretch',
		left: 0,
		right: 0,
		bottom: 0,
		height: 40,
		padding: 0,
		paddingLeft: 5,
		overflow: 'hidden'
	},
	data: {
		width: 45,
		textAlign: 'center'
	},
	removedData: {
		width: 45,
		textAlign: 'center',
		color: 'lightgray'
	}
});

export default SetData;
