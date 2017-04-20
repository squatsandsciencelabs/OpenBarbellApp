// app/components/HistoryFilterBar.js

import React, {Component} from 'react';
import { View, Text, Switch, StyleSheet, TouchableHighlight }  from 'react-native';

class HistoryFilterBar extends Component {

	_onPressSwitch(isSwitchOn) {
		if (isSwitchOn) {
			this.props.showRemoved();
		} else {
			this.props.hideRemoved();
		}
	}

	render() {
		return (
			<View style={styles.bar}>
				<Text style={{color:'white'}}>Show Deleted Reps</Text>
				<Switch
					style={{backgroundColor: 'rgba(47, 128, 237, 1)', marginLeft: 3, marginRight: 5}}
					value={this.props.shouldShowRemoved}
					onValueChange={(isSwitchOn) => this._onPressSwitch(isSwitchOn)}
					onTintColor='white'
					thumbTintColor='lightgray'
					tintColor='white'/>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	bar: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center', // stretch to take full height
		justifyContent: 'flex-end', // center text vertically
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(47, 128, 237, 1)',
		position: 'absolute',
		height: 50,
		padding:0,
	},
});

export default HistoryFilterBar;
