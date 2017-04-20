// app/components/WorkoutFilterBar.js

import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableHighlight }  from 'react-native';
import {
	WORKOUT_AVG_FILTER,
	WORKOUT_PKV_FILTER,
	WORKOUT_PKH_FILTER,
	WORKOUT_ROM_FILTER,
	WORKOUT_DUR_FILTER,
} from '../ActionTypes';

// TODO: this should be made into a generic bar view
// The screen should pass in the specifics and the action thereafter

class WorkoutFilterBar extends Component {

	_filterStyle(filter) {
		if (filter == this.props.filter) {
			return styles.selectedOption;
		} else {
			return styles.option;
		}
	}

	render() {
		return (
			<View style={styles.bar}>
				<TouchableHighlight onPress={ () => this.props.filterAVGWorkout() } style={styles.touch} activeOpacity={1}>
					<Text style={this._filterStyle(WORKOUT_AVG_FILTER)}>AVG</Text>
				</TouchableHighlight>
				<TouchableHighlight onPress={ () => this.props.filterPKVWorkout() } style={styles.touch} activeOpacity={1}>
					<Text style={this._filterStyle(WORKOUT_PKV_FILTER)}>PKV</Text>
				</TouchableHighlight>
				<TouchableHighlight onPress={ () => this.props.filterPKHWorkout() } style={styles.touch} activeOpacity={1}>
					<Text style={this._filterStyle(WORKOUT_PKH_FILTER)}>PKH</Text>
				</TouchableHighlight>
				<TouchableHighlight onPress={ () => this.props.filterROMWorkout() } style={styles.touch} activeOpacity={1}>
					<Text style={this._filterStyle(WORKOUT_ROM_FILTER)}>ROM</Text>
				</TouchableHighlight>
				<TouchableHighlight onPress={ () => this.props.filterDURWorkout() } style={styles.touch} activeOpacity={1}>
					<Text style={this._filterStyle(WORKOUT_DUR_FILTER)}>DUR</Text>
				</TouchableHighlight>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	touch: {
	    justifyContent: 'center', // center text vertically
		alignItems: 'center', // center text horizontally
		flex: 1
	},
	bar: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'stretch', // stretch to take full height
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(47, 128, 237, 1)',
		position: 'absolute',
		height: 50,
		padding:0,
	},
	option: {
		// flex-grow: 1,
		color: 'rgba(255, 255, 255, .5)'
	},
	selectedOption: {
		// flex-grow: 1,
		color: 'rgba(255, 255, 255, 1)'
	}
});

export default WorkoutFilterBar;
