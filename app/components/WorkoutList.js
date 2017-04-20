// app/components/WorkoutList.js

import React, { Component } from 'react';
import {
	repNumber,
	averageVelocity,
	rangeOfMotion,
	peakVelocity,
	peakVelocityLocation,
	durationOfLift
} from '../utility/RepDataMap';
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
import {
	WORKOUT_AVG_FILTER,
	WORKOUT_PKV_FILTER,
	WORKOUT_PKH_FILTER,
	WORKOUT_ROM_FILTER,
	WORKOUT_DUR_FILTER,
} from '../ActionTypes';

// TODO: separate logic from presentational layer
// Data and actions should go into the workout screen
// This includes moving _getListViewData to WorkoutScreen.js

class WorkoutList extends Component {

	// DATA

	constructor(props) {
		super(props);

		// initialize the datasource
		let	dataSource = new ListView.DataSource({
			sectionHeaderHasChanged: this._sectionHeaderHasChanged,
			rowHasChanged: this._rowHasChanged,
		});
		let { data, sectionIds } = this._getListViewData(this.props.sets, this.props.filter);
		this.state = {
			dataSource: dataSource.cloneWithRowsAndSections(data, sectionIds),
		};
	}

	// state changed, reset the dataSource as needed
	componentWillReceiveProps(nextProps) {
		if (nextProps.sets !== this.props.sets || nextProps.filter !== this.props.filter) {
			let { data, sectionIds } = this._getListViewData(nextProps.sets, nextProps.filter);
			this.setState({
				dataSource: this.state.dataSource.cloneWithRowsAndSections(data, sectionIds),
			})
		}
	}

	_dataForRep(rep, filter) {
		if (rep.removed === true) {
			return "Removed";
		}

		if (rep.isValid === false) {
			return "Corrupted";
		}

		let repData = rep.data;
		switch (filter) {
			case WORKOUT_AVG_FILTER:
				return averageVelocity(repData);
			case WORKOUT_PKV_FILTER:
				return peakVelocity(repData);
			case WORKOUT_PKH_FILTER:
				return peakVelocityLocation(repData);
			case WORKOUT_ROM_FILTER:
				return rangeOfMotion(repData);
			case WORKOUT_DUR_FILTER:
				let duration = durationOfLift(repData)
				if (duration) {
					return (duration / 1000000.0).toFixed(2);
				}else {
					return "";
				}
			default:
				return "";
		}
	}

	_unitForRep(rep, filter) {
		if (rep.removed === true) {
			return "";
		}

		switch (filter) {
			case WORKOUT_AVG_FILTER:
				return "m/s";
			case WORKOUT_PKV_FILTER:
				return "m/s";
			case WORKOUT_PKH_FILTER:
				return "%";
			case WORKOUT_ROM_FILTER:
				return "mm";
			case WORKOUT_DUR_FILTER:
				if (durationOfLift(rep.data)) {
					return "sec";
				} else {
					return "obv2 only"
				}
			default:
				return "";
		}
	}

	// converts the props into data the ListView uses
	// not sure what better option there is
	_getListViewData(sets, filter) {
		let data = { };
		let sectionIDs = [];
		let setPosition = sets.length;
		let disabledColor = 'lightgray';
		let normalDarkColor = 'black';
		let normalLightColor = 'gray';
		let highlightColor = 'rgba(255, 0, 0, 0.25)';

		sets.map((set) => {
			//every set is a section
			sectionIDs.push(setPosition);

			//every rep is a row
			let array = [];
			if (set.reps.length < 4) {
				var start = 3;
				var dataOffset = 4-set.reps.length;
			} else {
				var start = set.reps.length-1;
				var dataOffset = 0;
			}
			for (var i=start; i >= 0; i--) {
				// data position
				let dataPosition = i-dataOffset;

				// define obj
				let obj = {
					setInfo: null,
					data: null,
					unit: null,
					setID: set.setID,
					rep: dataPosition,
					labelColor: null,
					dataColor: set.removed ? disabledColor : normalDarkColor,
					unitColor: set.removed ? disabledColor : normalLightColor,
					removed: false,
					isLastRow: false
				};

				//add setInfo
				switch (start-i) {
					case 0:
						if (set.exercise === null || set.exercise == '') {
							obj.setInfo = 'INPUT EXERCISE';
							obj.labelColor = set.removed ? disabledColor : highlightColor;
						}else {
							obj.setInfo = set.exercise;
							obj.labelColor = set.removed ? disabledColor : normalDarkColor;
						}
						break;
					case 1:
						if (set.weight === null || set.exercise == '') {
							obj.setInfo = 'INPUT WEIGHT';
							obj.labelColor = set.removed ? disabledColor : highlightColor;
						} else {
							obj.setInfo = set.weight + " " + set.metric;
							obj.labelColor = set.removed ? disabledColor : normalDarkColor;
						}
						break;
					case 2:
						if (set.rpe === null) {
							obj.setInfo = 'INPUT RPE';
							obj.labelColor = set.removed ? disabledColor : highlightColor;
						} else {
							obj.setInfo = set.rpe + ' RPE';
							obj.labelColor = set.removed ? disabledColor : normalDarkColor;
						}
						break;
					case start:
						obj.isLastRow = true;
						if (setPosition == 1) {
							obj.setInfo = "Finish Current Set";
						}
						break;
					default:
						break;
				}

				//add data
				if (dataPosition >= 0 && dataPosition < set.reps.length) {
					obj.data = this._dataForRep(set.reps[dataPosition], filter);
					obj.unit = this._unitForRep(set.reps[dataPosition], filter);
					obj.removed = set.reps[dataPosition].removed;
				}

				//add obj
				array.push(obj);
			}

			data[setPosition] = array;

			//increment
			setPosition--;
		});

		// hack force a starting section for end workout
		sectionIDs.push(setPosition);
		data[setPosition] = [ {} ];

		let returnArray = sectionIDs.reverse();

		return { data, returnArray };
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
