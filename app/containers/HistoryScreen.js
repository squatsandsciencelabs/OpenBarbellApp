// app/containers/HistoryScreen.js

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HistoryList from '../components/HistoryList';
import * as HistoryActionCreators from '../actions/HistoryActionCreators';
import * as SetActionCreators from '../actions/SetActionCreators';
import { getHistorySets } from '../reducers/SetReducer';
import { repNumber, averageVelocity, rangeOfMotion, peakVelocity, peakVelocityLocation, durationOfLift } from '../utility/RepDataMap';

// NOTE: this means that every history screen accesses previous values as singletons
var storedData = null;
var storedSectionIDs = null;
var storedHistoryData = null;
var storedHistorySets = null;
var storedShouldShowRemoved = null;

const getListViewModels = (sets, shouldShowRemoved) => {
	// declare variables
	let data = { };
	let sectionIDs = [];
	let setPosition = 0; // position in the data dictionary
	let highlightColor = 'rgba(255, 0, 0, 0.25)';
	let normalColor = 'black';
	let disabledColor = 'lightgray';
	var lastWorkoutID = null;

	// build view models
	sets.map((set) => {
		// ignore empty ones
		if (set.reps.length === 0 || (!shouldShowRemoved && set.removed)) {
			return;
		}

		// every set is a section
		sectionIDs.push(setPosition);

		// create array
		let array = [];

		// first row is the special header
		let headerObj = {
			type: "header",
			setID: set.setID
		};
		if (lastWorkoutID !== set.workoutID) {
			lastWorkoutID = set.workoutID;
			headerObj.workoutDate = new Date(set.startTime).toLocaleString();
		} else {
			headerObj.workoutDate = null;
		}
		if (set.exercise === null) {
			headerObj.row1 = 'INPUT EXERCISE';
			headerObj.row1Color = set.removed ? disabledColor : highlightColor;
		} else {
			headerObj.row1 = set.exercise;
			headerObj.row1Color = set.removed ? disabledColor : normalColor;
		}
		if (set.weight === null) {
			headerObj.row2 = 'INPUT WEIGHT';
			headerObj.row2Color = set.removed ? disabledColor : highlightColor;
		} else {
			headerObj.row2 = set.weight + ' ' + set.metric;
			headerObj.row2Color = set.removed ? disabledColor : normalColor;
		}
		if (set.rpe === null) {
			headerObj.row3 = 'INPUT RPE';
			headerObj.row3Color = set.removed ? disabledColor : highlightColor;
		} else {
			headerObj.row3 = set.rpe + ' RPE';
			headerObj.row3Color = set.removed ? disabledColor : normalColor;
		}
		array.push(headerObj);

		// every other rep is a row
		for (let i=0; i<set.reps.length; i++) {
			let rep = set.reps[i];

			if (shouldShowRemoved === false && rep.removed === true) {
				continue;
			}

			// obv1 properties
			let obj = {
				type: "data",
				rep: i,
				repDisplay: i+1,
				setID: set.setID,
				averageVelocity: "Invalid",
				peakVelocity: "Invalid",
				peakVelocityLocation: "Invalid",
				rangeOfMotion: "Invalid",
				duration: "Invalid",
				removed: rep.removed
			};

			if (rep.isValid == true) {
				let repData = rep.data;

				let avgVel = averageVelocity(repData);
				if (avgVel !== null) {
					obj.averageVelocity = avgVel;
				}

				let peakVel = peakVelocity(repData);
				if (peakVel !== null) {
					obj.peakVelocity = peakVel;
				}

				let peakVelLoc = peakVelocityLocation(repData);
				if (peakVelLoc !== null) {
					obj.peakVelocityLocation = peakVelLoc;
				}

				let rom = rangeOfMotion(repData);
				if (rom !== null) {
					obj.rangeOfMotion = rom;
				}

				// obv2 properties
				let duration = durationOfLift(repData)
				if (duration !== null) {
					obj.duration = (duration / 1000000.0).toFixed(2);
				} else {
					obj.duration = "obv2 only";
				}
			}

			//add obj
			array.push(obj);
		}

		// save the array of data
		data[setPosition] = array;

		//increment
		setPosition++;
	});

	return { data, sectionIDs };
}

const mapStateToProps = (state) => {
	let shouldShowRemoved = state.history.showRemoved;
	let historyData = state.sets.historyData;
	let rebuildViewModels = false;

	if (historyData !== storedHistoryData) {
		// data changed, redo it all
		storedHistoryData = historyData;
		storedHistorySets = getHistorySets(state.sets);
		rebuildViewModels = true;
	} else if (shouldShowRemoved !== storedShouldShowRemoved) {
		// toggled with no data changed, just rebiuld viewomodels
		rebuildViewModels = true;
	}

	if (rebuildViewModels) {
		let { data, sectionIDs } = getListViewModels(storedHistorySets, shouldShowRemoved);
		storedData = data;
		storedSectionIDs = sectionIDs;
		storedShouldShowRemoved = shouldShowRemoved;
	}

	return {
		data: storedData,
		sectionIDs: storedSectionIDs,
		shouldShowRemoved: shouldShowRemoved
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		editHistorySet: HistoryActionCreators.editHistorySet,
		removeRep: SetActionCreators.removeHistoryRep,
		restoreRep: SetActionCreators.restoreHistoryRep
	}, dispatch);
};

const HistoryScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(HistoryList);

export default HistoryScreen;
