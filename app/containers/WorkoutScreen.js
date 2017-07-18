// app/containers/WorkoutScreen.js

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WorkoutList from '../components/WorkoutList';
import * as SetActionCreators from '../actions/SetActionCreators';
import * as WorkoutActionCreators from '../actions/WorkoutActionCreators';
import { getWorkoutSets } from '../reducers/SetReducer';
import * as DateUtils from '../utility/DateUtils';
import {
	repNumber,
	averageVelocity,
	rangeOfMotion,
	peakVelocity,
	peakVelocityLocation,
	durationOfLift
} from '../utility/RepDataMap';

// assumes chronological sets
const createViewModels = (sets) => {
	// declare variables
	let section = { key: 1, data: [] }; // contains the actual data
	let sections = [section]; // the return value
	let lastExerciseName = null; // to help calculate set numbers
	let setNumber = 1; // set number to display
	let lastSetEndTime = null; // to help calculate rest time
	let isInitialSet = true; // to help determine when to display rest time and split up the sections properly
	let count = 0;

	// build view models
	sets.map((set) => {
		// last section check, splitting the "current set" out for footer purposes
		// TODO: depending on design for "finish current set", can put all the data in one section instead
		if (count === sets.length-1) {
			section = { key: 0, data: [], position: -1 };
			sections.splice(0, 0, section); // insert at beginning
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
		if (set.reps.length > 0) {
			array.push({type: "subheader", key: set.setID+"subheader"});
		}
		lastExerciseName = set.exercise;

		// reps
		Array.prototype.push.apply(array, createRowViewModels(set));

		// rest footer
		if (isInitialSet) {
			// new set, reset the end time
			lastSetEndTime = set.removed ? null : set.endTime;
		} else if (!set.removed) { // ignore removed sets in rest calculations
			// add footer if valid
			if (lastSetEndTime !== null && set.startTime > lastSetEndTime) {
				array.push(createFooterVM(set, lastSetEndTime));
			}

			// update variable for calculation purposes
			lastSetEndTime = set.endTime;
		}

		// insert set card data
		Array.prototype.splice.apply(section.data, array);

		// increment and reset
		isInitialSet = false;
		count++;
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

const createRowViewModels = (set) => {
	let array = [];

	for (let i=0, repCount=0; i<set.reps.length; i++) {
		// get rep
		let rep = set.reps[i];

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
		array.splice(0, 0, vm); // insert at beginning
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
	let sets = getWorkoutSets(state.sets);
	return {
		sections: createViewModels(sets)
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		endSet: SetActionCreators.endSet,
		endWorkout: WorkoutActionCreators.endWorkout,
		removeRep: SetActionCreators.removeWorkoutRep,
		restoreRep: SetActionCreators.restoreWorkoutRep,
		viewExpandedSet: WorkoutActionCreators.beginViewExpandedSet,
	}, dispatch);
};

const WorkoutScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(WorkoutList);

export default WorkoutScreen;
