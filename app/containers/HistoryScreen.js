// app/containers/HistoryScreen.js

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HistoryList from '../components/HistoryList';
import * as HistoryActionCreators from '../actions/HistoryActionCreators';
import * as SetActionCreators from '../actions/SetActionCreators';
import * as SetReducer from '../reducers/SetReducer';
import { repNumber, averageVelocity, rangeOfMotion, peakVelocity, peakVelocityLocation, durationOfLift } from '../utility/RepDataMap';

// NOTE: this means that every history screen accesses previous values as singletons
var storedData = null;
var storedSectionIDs = null;
var storedHistoryData = null;
var storedHistorySets = null;
var storedShouldShowRemoved = null;

// assumes chronological sets
const getListViewModels = (sets, shouldShowRemoved) => {
	// declare variables
	let data = { };
	let sectionIDs = [];
	let setPosition = 0; // position in the data dictionary
	let highlightColor = 'rgba(255, 0, 0, 0.25)';
	let normalColor = 'black';
	let disabledColor = 'lightgray';
	var lastWorkoutID = null;
	var workoutStartTime = null;
	var lastSetEndTime = null;
	var isSameWorkout = false;

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
			setID: set.setID,
			workoutDate: null
		};
		if (lastWorkoutID !== set.workoutID) {
			// set the date header to the LAST set of a workout as we will be reversing the order of elements
			if (lastWorkoutID !== null) {
				data[setPosition-1][0].workoutDate = new Date(workoutStartTime).toLocaleString();
			}
			lastWorkoutID = set.workoutID;
			workoutStartTime = set.startTime;
			isSameWorkout = false;
		} else {
			isSameWorkout = true;
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
		for (let i=0, repCount=0; i<set.reps.length; i++) {
			let rep = set.reps[i];

			if (shouldShowRemoved === false && rep.removed === true) {
				continue;
			}

			// increment rep count
			repCount++;

			// obv1 properties
			let obj = {
				type: "data",
				rep: i,
				repDisplay: repCount,
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

		// last row is the rest footer
		if (!isSameWorkout) {
			// new set, reset the end time
			lastSetEndTime = set.removed ? null : set.endTime;
		} else if (!set.removed) { // ignore removed sets in rest calculations
			// add footer if valid
			if (lastSetEndTime !== null) {
				let restInMS = new Date(set.startTime) - new Date(lastSetEndTime)
				let footerObj = {
					type: "footer",
					rest: millisToMinutesAndSeconds(restInMS)

				};
				array.push(footerObj);
			}

			// update variable for calculation purposes
			lastSetEndTime = set.endTime;
		}
	
		// save the array of data
		data[setPosition] = array;

		//increment
		setPosition++;
	});

	// add final date header
	if (setPosition > 0 && workoutStartTime !== null) {
		data[setPosition-1][0].workoutDate = new Date(workoutStartTime).toLocaleString();
	}

	// make it descending rather than ascending order
	var reversedData = {};
	for (sectionID in sectionIDs) {
		reversedData[sectionID] = data[sectionIDs.length - 1 - sectionID];
	}
	data = reversedData;

	return { data, sectionIDs };
}

const millisToMinutesAndSeconds = (millis) => {
	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	if (minutes > 0 && seconds > 0) {
		return minutes + " mins, " + seconds + " secs rest";
	} else if (minutes > 0) {
		return minutes + " mins rest";
	} else {
		return seconds + " secs rest";
	}
};

const mapStateToProps = (state) => {
	let shouldShowRemoved = state.history.showRemoved;
	let historyData = state.sets.historyData;
	let rebuildViewModels = false;

	if (historyData !== storedHistoryData) {
		// data changed, redo it all
		storedHistoryData = historyData;
		storedHistorySets = SetReducer.getHistorySetsChronological(state.sets);
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
