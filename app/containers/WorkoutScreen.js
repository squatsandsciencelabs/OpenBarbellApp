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
import {
	WORKOUT_AVG_FILTER,
	WORKOUT_PKV_FILTER,
	WORKOUT_PKH_FILTER,
	WORKOUT_ROM_FILTER,
	WORKOUT_DUR_FILTER,
} from '../ActionTypes';

const dataForRep = (rep, filter) => {
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
};

const unitForRep = (rep, filter) => {
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
};

const getListViewModels = (sets, filter) => {
	let data = { };
	let sectionIDs = [];
	let setPosition = sets.length;
	let disabledColor = 'lightgray';
	let normalDarkColor = 'black';
	let normalLightColor = 'gray';
	let highlightColor = 'rgba(255, 0, 0, 0.25)';
	let lastSetEndTime = null;

	sets.map((set) => {
		// every set is a section
		sectionIDs.push(setPosition);
		let array = [];

		// ensure that there are at least 4 rows in each set
		// necessary for all the left side options in workout
		if (set.reps.length < 4) {
			var start = 3;
			var dataOffset = 4-set.reps.length;
		} else {
			var start = set.reps.length-1;
			var dataOffset = 0;
		}

		// add rest time
		if (lastSetEndTime !== null) {
			let restInMS = new Date(set.startTime) - new Date(lastSetEndTime);
			let restObj = {
				type: "footer",
				rest: DateUtils.restInSentenceFormat(restInMS)
			};
			array.push(restObj);
		}
		lastSetEndTime = set.endTime;

		// every rep is a row
		for (var i=0; i <= start; i++) {
			// data position
			let dataPosition = i-dataOffset;

			// define obj
			let obj = {
				type: "data",
				setInfo: null,
				data: null,
				unit: null,
				setID: set.setID,
				rep: dataPosition,
				labelColor: null,
				dataColor: set.removed ? disabledColor : normalDarkColor,
				unitColor: set.removed ? disabledColor : normalLightColor,
				removed: false,
				isFinishSetRow: false
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
					obj.isFinishSetRow = true;
					if (setPosition == 1) {
						obj.setInfo = "Finish Current Set";
					}
					break;
				default:
					break;
			}

			//add data
			if (dataPosition >= 0 && dataPosition < set.reps.length) {
				obj.data = dataForRep(set.reps[dataPosition], filter);
				obj.unit = unitForRep(set.reps[dataPosition], filter);
				obj.removed = set.reps[dataPosition].removed;
			}

			//add obj
			array.push(obj);
		}

		// reverse and save
		data[setPosition] = array.reverse();

		//increment
		setPosition--;
	});

	// hack force a starting section for end workout
	sectionIDs.push(setPosition);
	data[setPosition] = [ {} ];

	let returnArray = sectionIDs.reverse();

	return { data, returnArray };
};

const mapStateToProps = (state) => {
	let filter = state.workout.filter;
	let sets = getWorkoutSets(state.sets);
	let { data, sectionIDs} = getListViewModels(sets, filter);
	return {
		data: data,
		sectionIDs: sectionIDs,
		filter: filter
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		endSet: SetActionCreators.endSet,
		editWorkoutSet: WorkoutActionCreators.editWorkoutSet,
		endWorkout: WorkoutActionCreators.endWorkout,
		removeRep: SetActionCreators.removeWorkoutRep,
		restoreRep: SetActionCreators.restoreWorkoutRep
	}, dispatch);
};

const WorkoutScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(WorkoutList);

export default WorkoutScreen;
