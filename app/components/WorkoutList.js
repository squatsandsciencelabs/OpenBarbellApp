// app/components/WorkoutList.js

import React, { Component } from 'react';
import {
	TouchableHighlight,
	Text,
	StyleSheet,
	View,
	ListView,
	ScrollView,
	Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import EditWorkoutSetScreen from '../containers/EditWorkoutSetScreen';
import WorkoutFilterBarScreen from '../containers/WorkoutFilterBarScreen';

class WorkoutList extends Component {

	// DATA

	constructor(props) {
		super(props);

		// initialize the datasource
		let	dataSource = new ListView.DataSource({
			sectionHeaderHasChanged: this._sectionHeaderHasChanged,
			rowHasChanged: this._rowHasChanged,
		});
		this.state = {
			dataSource: dataSource.cloneWithRowsAndSections(props.data, props.sectionIDs),
		};
	}

	// state changed, reset the dataSource as needed
	componentWillReceiveProps(nextProps) {
		if (nextProps.data !== this.props.data || nextProps.sectionIDs !== this.props.sectionIDs || nextProps.filter !== this.props.filter) {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.data, nextProps.sectionIDs),
			});
		}
	}

	_sectionHeaderHasChanged(s1, s2) {
		return s1 !== s2;
	}

	_rowHasChanged(r1, r2) {
		return r1 !== r2;
	}

	// ACTION

	_onPressNewSet() {
		this.props.endSet();
	}

	_onPressRow(rowData) {
		this.props.editWorkoutSet(rowData.setID);
	}

	_onPressRemove(rowData) {
		this.props.removeRep(rowData.setID, rowData.rep);
	}

	_onPressRestore(rowData) {
		this.props.restoreRep(rowData.setID, rowData.rep);
	}

	_onPressEndWorkout() {
		this.props.endWorkout();
	}

	// RENDER

	_renderSectionHeader(set, sectionID) {
		return (
			<View style={{height:20}}>
			</View>
		);
	}

	_renderLeftRowItems(rowData, sectionID, rowID) {
		if (sectionID == 1 && rowData.isLastRow == true) {
			return (
				<TouchableHighlight onPress={ () => this._onPressNewSet() }>
					<Text style={[styles.blueButton, { textAlign: 'center'}]}>{ rowData.setInfo }</Text>
				</TouchableHighlight>
			);
		} else {
			return (
				<Text style={[styles.sectionHeaderText, {color:rowData.labelColor}]}>{ rowData.setInfo }</Text>
			);
		}
	}

	_renderRow(rowData, sectionID, rowID) {
		if (sectionID == 0) {
			// end workout
			return (
				<TouchableHighlight onPress={ () => this._onPressEndWorkout() }>
					<Text style={[styles.blueButton, { textAlign: 'center'}]}>End Workout</Text>
				</TouchableHighlight>
			);
		} else {
			// all other sets

			var button = null;
			if (rowData.data !== null) {
				if (rowData.removed === false) {
					button = (
						<TouchableHighlight onPress={ () => this._onPressRemove(rowData) } style={{padding: 5, paddingLeft: 7}} >
							<Icon name="close" size={20} color="lightgray" style={{marginTop: 3}} />
						</TouchableHighlight>
					);
				} else {
					button = (
						<TouchableHighlight onPress={ () => this._onPressRestore(rowData) } style={{padding: 5, paddingLeft: 7}} >
							<Icon name="undo" size={20} color="lightgray" style={{marginTop: 3}} />
						</TouchableHighlight>
					);
				}
			}

			return (
				<TouchableHighlight onPress={ () => this._onPressRow(rowData) } activeOpacity={1} >
					<View style={{flexDirection:'row', justifyContent:'space-between', backgroundColor:'white', paddingLeft: 7, paddingBottom: 3}}>
						{ this._renderLeftRowItems(rowData, sectionID, rowID) }
						<View style={{flexDirection:'row'}}>
							<Text style={[styles.rowText, {color:rowData.dataColor}]}>{rowData.data}</Text>
							<Text style={[styles.rowText, {color:rowData.unitColor}]}> {rowData.unit}</Text>
							{button}
						</View>
					</View>
				</TouchableHighlight>
			);
		}
	}

	render() {
		var { height, width } = Dimensions.get('window');

		return (
			<View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'rgba(0, 0, 0, 0)' }}>
				<View style={{ flex: 1 }}>
					<EditWorkoutSetScreen />
					<ListView
						ref="listView"
						enableEmptySections = { true }
						dataSource={this.state.dataSource}
						renderRow={(rowData, sectionID, rowID) => this._renderRow(rowData, sectionID, rowID)}
						renderSectionHeader={(set, sectionID) => this._renderSectionHeader(set, sectionID)}
						style = {[styles.Shadow, { backgroundColor: 'rgba(0, 0, 0, 0)'}]} />
				</View>

				<View style={{height: 50}}>
					<WorkoutFilterBarScreen />
				</View>
			</View>
		);
	}
}
//NOTE: currently container names reference the React Native flexDirection which imo is confusing
const styles = StyleSheet.create({
	sectionHeaderText: {
		fontFamily: 'AvenirNext-Medium',
		fontSize: 16,
		left: 0,
	},
	blueButton: {
		backgroundColor: 'rgba(47, 128, 237, 1)',
		color: 'white',
		padding: 5
	},
	Shadow: {
		shadowColor: "#000000",
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 0
		},
		padding: 10
	},
	rowText: {
		fontSize:20,
		paddingTop:5,
	},
});

export default WorkoutList
