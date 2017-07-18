// app/containers/HistoryScreen.js

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HistoryList from '../components/HistoryList';
import * as HistoryActionCreators from '../actions/HistoryActionCreators';
import * as SetActionCreators from '../actions/SetActionCreators';
import * as SetReducer from '../reducers/SetReducer';
import * as DateUtils from '../utility/DateUtils';
import { repNumber, averageVelocity, rangeOfMotion, peakVelocity, peakVelocityLocation, durationOfLift } from '../utility/RepDataMap';

// NOTE: this means that every history screen accesses previous values as singletons
var storedSections = null; // the actual data
var storedHistoryData = null; // for comparison purposes
var storedHistorySets = null; // to remove the need to fetch the sets again in chronological order
var storedShouldShowRemoved = null; // for comparison purposes

// assumes chronological sets
const createViewModels = (sets, shouldShowRemoved) => {
	// declare variables
	let sections = []; // the return value
	let section = null; // contains the actual data
	let lastWorkoutID = null; // to help calculate sections
	let lastExerciseName = null; // to help calculate set numbers
	let setNumber = 1; // set number to display
	let workoutStartTime = null; // to help calculate rest time and display section header
	let lastSetEndTime = null; // to help calculate rest time
	let isInitialSet = false; // to help determine when to display rest time

	// ignore empty or removed sets
	var sets = sets.filter((set) => set.reps.length > 0 && (shouldShowRemoved || !set.removed));

	// build view models
	sets.map((set) => {
		// every workout is a section
		if (lastWorkoutID !== set.workoutID) {
			// set vars
			lastWorkoutID = set.workoutID;
			workoutStartTime = set.startTime;
			isInitialSet = true;

			// create section
			section = { key: new Date(workoutStartTime).toLocaleString(), data: [], position: -1 };
			sections.splice(0, 0, section); // insert at beginning
		} else {
			isInitialSet = false;
		}

		// set card data
		let array = [0, 0];

		// card header
		if (isInitialSet) {
			lastExerciseName = null;
			setNumber = 1;
		} else if (!set.removed) {
			if (lastExerciseName !== null && lastExerciseName === set.exercise) {
				setNumber++;
			} else {
				setNumber = 1;
			}
		}
		array.push(createHeaderViewModel(set, setNumber));
		array.push({type: "subheader", key: set.setID+"subheader"});
		lastExerciseName = set.exercise;

		// reps
		Array.prototype.push.apply(array, createRowViewModels(set, shouldShowRemoved));

		// rest footer
		if (isInitialSet) {
			// new set, reset the end time
			lastSetEndTime = set.removed ? null : set.endTime;
		} else if (!set.removed) { // ignore removed sets in rest calculations
			// add footer if valid
			if (lastSetEndTime !== null) {
				array.push(createFooterVM(set, lastSetEndTime));
			}

			// update variable for calculation purposes
			lastSetEndTime = set.endTime;
		}

		// insert set card data
		Array.prototype.splice.apply(section.data, array);
	});

	// add positions
	for (var i = 0; i < sections.length; i++) {
		sections[i].position = i;
	}

	// return
	return sections;
}

const createHeaderViewModel = (set, setNumber) => ({
	type: 'header',
	key: set.setID+'header',
	setID: set.setID,
	removed: set.removed,
	setNumber: setNumber,
	exercise: set.exercise,
	tags: set.tags,
	weight: set.weight,
	metric: set.metric,
	rpe: set.rpe
});

const createRowViewModels = (set, shouldShowRemoved) => {
	let array = [];

	for (let i=0, repCount=0; i<set.reps.length; i++) {
		// get rep
		let rep = set.reps[i];

		// ignore deleted rows if necessary
		if (shouldShowRemoved === false && rep.removed === true) {
			continue;
		}

		// increment rep count
		repCount++;

		// obv1 properties
		let vm = {
			type: "data",
			rep: i,
			repDisplay: repCount,
			setID: set.setID,
			averageVelocity: "Invalid",
			peakVelocity: "Invalid",
			peakVelocityLocation: "Invalid",
			rangeOfMotion: "Invalid",
			duration: "Invalid",
			removed: rep.removed,
			key: set.setID+i,
		};

		// update data if valid
		if (rep.isValid == true) {
			let repData = rep.data;

			let avgVel = averageVelocity(repData);
			if (avgVel !== null) {
				vm.averageVelocity = avgVel;
			}

			let peakVel = peakVelocity(repData);
			if (peakVel !== null) {
				vm.peakVelocity = peakVel;
			}

			let peakVelLoc = peakVelocityLocation(repData);
			if (peakVelLoc !== null) {
				vm.peakVelocityLocation = peakVelLoc;
			}

			let rom = rangeOfMotion(repData);
			if (rom !== null) {
				vm.rangeOfMotion = rom;
			}

			// obv2 properties
			let duration = durationOfLift(repData)
			if (duration !== null) {
				vm.duration = (duration / 1000000.0).toFixed(2);
			} else {
				vm.duration = "obv2 only";
			}
		}

		//add obj
		array.push(vm);
	}

	// return
	return array;
};

const createFooterVM = (set, lastSetEndTime) => {
	let restInMS = new Date(set.startTime) - new Date(lastSetEndTime);
	let footerVM = {
		type: "footer",
		rest: DateUtils.restInSentenceFormat(restInMS),
		key: set.setID + 'rest'
	};
	return footerVM;
};

const mapStateToProps = (state) => {
	// declare vars
	let shouldShowRemoved = state.history.showRemoved;
	let historyData = state.sets.historyData;
	let rebuildViewModels = false;

	// determine rebuilding of viewmodels
	if (historyData !== storedHistoryData) {
		// data changed, redo it all
		storedHistoryData = historyData;
		storedHistorySets = SetReducer.getHistorySetsChronological(state.sets);
		rebuildViewModels = true;
	} else if (shouldShowRemoved !== storedShouldShowRemoved) {
		// toggled with no data changed, just rebuild viewmodels
		rebuildViewModels = true;
	}

	// rebuild if needed
	if (rebuildViewModels) {
		storedSections = createViewModels(storedHistorySets, shouldShowRemoved);
		storedShouldShowRemoved = shouldShowRemoved;
	}

	return {
		email: state.auth.email,
		sections: storedSections,
		shouldShowRemoved: shouldShowRemoved
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		removeRep: SetActionCreators.removeHistoryRep,
		restoreRep: SetActionCreators.restoreHistoryRep,
		finishedLoadingHistory: HistoryActionCreators.finishedLoadingHistory,
		viewExpandedSet: HistoryActionCreators.beginViewExpandedSet
	}, dispatch);
};

const HistoryScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(HistoryList);

export default HistoryScreen;
