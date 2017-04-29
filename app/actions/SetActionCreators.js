// app/actions/SetActionCreators.js

import {
	UPDATE_WORKOUT_SET,
	UPDATE_HISTORY_SET,
	UPDATE_WORKOUT_REP,
	UPDATE_HISTORY_REP,
	END_SET,
	BEGIN_UPLOADING_SETS,
	RE_ADD_SETS_TO_UPLOAD,
	CLEAR_SETS_BEING_UPLOADED,
	UPDATE_SET_DATA_FROM_SERVER,
	UPDATE_REVISION_FROM_SERVER,
	CLEAR_HISTORY
} from '../ActionTypes';
import * as ApiActionCreators from './ApiActionCreators';
import * as WorkoutActionCreators from '../actions/WorkoutActionCreators';
import { lastRepTime } from '../reducers/SetReducer';
import config from '../config.json';

export const updateWorkoutSet = (setID, exercise = null, weight = null, metric = null, rpe = null) => {
	var action  = {
		type: UPDATE_WORKOUT_SET
	};

	action.setID = setID;

	if (exercise != null) {
		action.exercise = exercise;
	}
	if (weight != null) {
		action.weight = weight;
	}
	if (metric != null) {
		action.metric = metric;
	}
	if (rpe != null) {
		action.rpe = rpe;
	}

	return action;
};

export const updateHistorySet = (setID, exercise = null, weight = null, metric = null, rpe = null) => (dispatch) => {
	var action = {
		type: UPDATE_HISTORY_SET
	};

	action.setID = setID;

	if (exercise != null) {
		action.exercise = exercise;
	}
	if (weight != null) {
		action.weight = weight;
	}
	if (metric != null) {
		action.metric = metric;
	}
	if (rpe != null) {
		action.rpe = rpe;
	}

	dispatch(action);
	dispatch(ApiActionCreators.syncData());
};

export const removeWorkoutRep = (setID, repIndex) => ({
	type: UPDATE_WORKOUT_REP,
	setID: setID,
	repIndex: repIndex,
	removed: true
});

export const restoreWorkoutRep = (setID, repIndex) => ({
	type: UPDATE_WORKOUT_REP,
	setID: setID,
	repIndex: repIndex,
	removed: false
});

export const removeHistoryRep = (setID, repIndex) => (dispatch) => {
	dispatch({
		type: UPDATE_HISTORY_REP,
		setID: setID,
		repIndex: repIndex,
		removed: true
	});
	dispatch(ApiActionCreators.syncData());
};

export const restoreHistoryRep = (setID, repIndex) => (dispatch) => {
	dispatch({
		type: UPDATE_HISTORY_REP,
		setID: setID,
		repIndex: repIndex,
		removed: false
	});
	dispatch(ApiActionCreators.syncData());
};

export const endSet = () => (dispatch, getState) => {
	var state = getState();
	var workoutData = state.sets.workoutData;

	if (!(workoutData.length > 0 && workoutData[workoutData.length-1].reps.length === 0)) {
		dispatch({
			type: END_SET
		});
	}
};

export const beginUploadingSets = () => ({ type: BEGIN_UPLOADING_SETS });

export const clearSetsBeingUploaded = () => ({ type: CLEAR_SETS_BEING_UPLOADED });

export const reAddSetsToUpload = () => ({ type: RE_ADD_SETS_TO_UPLOAD });

export const updateSetDataFromServer = (revision, sets) => ({
	type: UPDATE_SET_DATA_FROM_SERVER,
	sets: sets,
	revision: revision
});

export const updateRevisionFromServer = (revision) => ({
	type: UPDATE_REVISION_FROM_SERVER,
	revision: revision
});

export const endOldWorkout = () => (dispatch, getState) => {
	// get end time
	var state = getState();
	var endTime = lastRepTime(state.sets)
	if(endTime === null) {
		return
	}
	var endDate = new Date(endTime)

	var currentDate = new Date()
	var timeDifference = Math.abs(currentDate - endDate);
	console.log("TTime difference is " + timeDifference + " comparing " + endDate + " against " + currentDate + " with config timer " + config.endWorkoutTimer);

	if (timeDifference >= config.endWorkoutTimer) {
		alert("Ending workout! You can find your last workout on the History screen.");
		dispatch(WorkoutActionCreators.endWorkout())
	}
};

export const clearHistory = () => ({
	type: CLEAR_HISTORY
});
