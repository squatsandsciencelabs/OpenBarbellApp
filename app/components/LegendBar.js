// app/components/LegendBar.js

import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableHighlight }  from 'react-native';

// TODO: this should be made into a generic where you load it with the possible values
// Example, pass this class an array of text displays and associated filter options and map through them
// For speed purposes, doing it this way even though it's ugly

class LegendBar extends Component {

	render() {
		return (
			<View style ={styles.barWhole}>
				<View style={styles.bar}>
					<View style={styles.touch} activeOpacity={1}>
						<Text style={styles.label}>REP</Text>
					</View>
					<View style={styles.touch} activeOpacity={1}>
						<Text style={styles.label}>AVG</Text>
					</View>
					<View style={styles.touch} activeOpacity={1}>
						<Text style={styles.label}>PKV</Text>
					</View>
					<View style={styles.touch} activeOpacity={1}>
						<Text style={styles.label}>PKH</Text>
					</View>
					<View style={styles.touch} activeOpacity={1}>
						<Text style={styles.label}>ROM</Text>
					</View>
					<View style={styles.touch} activeOpacity={1}>
						<Text style={styles.label}>DUR</Text>
					</View>
				</View>
				<View style={styles.bar}>
					<View style={styles.touch} activeOpacity={1}>
						<Text style={styles.label}> # </Text>
					</View>
					<View style={styles.touch} activeOpacity={1}>
						<Text style={styles.label}>m/s</Text>
					</View>
					<View style={styles.touch} activeOpacity={1}>
						<Text style={styles.label}>m/s</Text>
					</View>
					<View style={styles.touch} activeOpacity={1}>
						<Text style={styles.label}> % </Text>
					</View>
					<View style={styles.touch} activeOpacity={1}>
						<Text style={styles.label}>mm</Text>
					</View>
					<View style={styles.touch} activeOpacity={1}>
						<Text style={styles.label}> s </Text>
					</View>
				</View>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	touch: {
		height: 50,
	    justifyContent: 'center',
	    alignItems: 'center',
	},
	bar: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'white',
		padding:0
	},
	barWhole: {
		flexDirection: 'column',
		justifyContent: 'flex-end',
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'white',
		padding:0,
		height: 30
	},
	label: {
		width: 45,
		color: 'rgba(189, 189, 189, 1)',
		textAlign: 'center'
	}
});

export default LegendBar;
