// app/reducers/SetReducer.js

import {
	UPDATE_WORKOUT_SET,
	UPDATE_WORKOUT_SET_TAGS,
	UPDATE_HISTORY_SET,
	UPDATE_HISTORY_SET_TAGS,
	ADD_REP_DATA,
	UPDATE_WORKOUT_REP,
	UPDATE_HISTORY_REP,
	END_SET,
	LOAD_PERSISTED_SET_DATA,
	END_WORKOUT,
	BEGIN_UPLOADING_SETS,
	CLEAR_SETS_BEING_UPLOADED,
	RE_ADD_SETS_TO_UPLOAD,
	UPDATE_SET_DATA_FROM_SERVER,
	UPDATE_REVISION_FROM_SERVER,
	CLEAR_HISTORY,
} from '../ActionTypes';
import uuidV4 from 'uuid/v4';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

const SetReducer = (state = createDefaultState(), action) => {
	switch (action.type) {
		case UPDATE_WORKOUT_SET:
			return updateWorkoutSet(state, action);
		case UPDATE_WORKOUT_SET_TAGS:
			return updateWorkoutSetTags(state, action);
		case UPDATE_HISTORY_SET:
			return updateHistorySet(state, action);
		case UPDATE_HISTORY_SET_TAGS:
			return updateHistorySetTags(state, action);
		case ADD_REP_DATA:
			return addRepData(state, action);
		case UPDATE_WORKOUT_REP:
			return updateWorkoutRep(state, action);
		case UPDATE_HISTORY_REP:
			return updateHistoryRep(state, action);
		case END_SET:
			return endSet(state, action);
		case LOAD_PERSISTED_SET_DATA:
			return loadPersistedSetData(state, action);
		// NOTE: it feels weird to have end workout here, but ending a workout affects the SETS not the workout itself, so the set reducer needs to handle it
		case END_WORKOUT:
			return endWorkout(state, action);
		case BEGIN_UPLOADING_SETS:
			return beginUploadingSets(state, action);
		case CLEAR_SETS_BEING_UPLOADED:
			return clearSetsBeingUploaded(state, action);
		case RE_ADD_SETS_TO_UPLOAD:
			return reAddSetsToUpload(state, action);
		case UPDATE_SET_DATA_FROM_SERVER:
			return updateSetDataFromServer(state, action);
		case UPDATE_REVISION_FROM_SERVER:
			return updateRevisionFromServer(state, action);
		case CLEAR_HISTORY:
			return clearHistory(state, action);
		default:
			return state;
	}
};

const createSet = (setNumber = 1) => ({
	exercise: null,
	setNumber: setNumber,
	setID: uuidV4(),
	workoutID: null, // to be set on ending workout
	weight: null,
	metric: 'kgs',
	rpe: null,
	startTime: null,
	endTime: null,
	removed: false,
	reps : []
});

const createDefaultState = () => {
	let set = createSet();
	let setID = set.setID;

	return {
		workoutData : [ set ],
		historyData: {},
		setIDsToUpload: [],
		setIDsBeingUploaded: [],
		revision: 0
	};
};

// UPDATE_WORKOUT_SET

// NOTE - using one slice to copy, then altering, as the spread operator + slice was buggy and deletes rows
const updateWorkoutSet = (state, action) => {
	let newWorkoutData = state.workoutData.slice(0);
	let setIndex = newWorkoutData.findIndex( set => set.setID === action.setID );
	let set = newWorkoutData[setIndex];

	let changes = {};
	if ('exercise' in action) {
		changes.exercise = action.exercise;
	}
	if ('weight' in action) {
		changes.weight = action.weight;
	}
	if ('metric' in action) {
		changes.metric = action.metric;
	}
	if ('rpe' in action) {
		changes.rpe = action.rpe;
	}

	newWorkoutData[setIndex] = Object.assign({}, set, changes);

	return Object.assign({}, state, {
		workoutData: newWorkoutData
	});
};

// UPDATE_WORKOUT_SET_TAGS

const updateWorkoutSetTags = (state, action) => {
	let newWorkoutData = state.workoutData.slice(0);
	let setIndex = newWorkoutData.findIndex( set => set.setID === action.setID );
	let set = newWorkoutData[setIndex];

	let changes = {
		tags: [...action.tags]
	};
	newWorkoutData[setIndex] = Object.assign({}, set, changes);

	return Object.assign({}, state, {
		workoutData: newWorkoutData
	});
};

// UPDATE_HISTORY_SET

const updateHistorySet = (state, action) => {
	let setID = action.setID;
	let historyData = state.historyData;
	let set = historyData[setID];

	// new set
	let setChanges = {};
	if ('exercise' in action) {
		setChanges.exercise = action.exercise;
	}
	if ('weight' in action) {
		setChanges.weight = action.weight;
	}
	if ('metric' in action) {
		setChanges.metric = action.metric;
	}
	if ('rpe' in action) {
		setChanges.rpe = action.rpe;
	}
	let newSet = Object.assign({}, set, setChanges);

	// state changes
	let stateChanges = {};
	stateChanges.historyData = Object.assign({}, historyData, {
		[setID]: newSet
	});
	if (!state.setIDsToUpload.includes(setID)) {
		stateChanges.setIDsToUpload = [...state.setIDsToUpload, setID];
	}

	return Object.assign({}, state, stateChanges);
};

// UPDATE_HISTORY_SET_TAGS

const updateHistorySetTags = (state, action) => {
	let setID = action.setID;
	let historyData = state.historyData;
	let set = historyData[setID];

	// new set
	let setChanges = {
		tags: [...action.tags]
	};
	let newSet = Object.assign({}, set, setChanges);

	// state changes
	let stateChanges = {};
	stateChanges.historyData = Object.assign({}, historyData, {
		[setID]: newSet
	});
	if (!state.setIDsToUpload.includes(setID)) {
		stateChanges.setIDsToUpload = [...state.setIDsToUpload, setID];
	}

	return Object.assign({}, state, stateChanges);
};

// ADD_REP_DATA

const addRepData = (state, action) => {
	let workoutData = state.workoutData;
	let set = workoutData[workoutData.length-1];
	let rep = {
		isValid: action.isValid,
		removed: false,
		hardware: Platform.OS,
		appVersion: DeviceInfo.getVersion(),
		deviceName: action.deviceName,
		deviceIdentifier: action.deviceIdentifier,
		data: [...action.data]
	};

	let setChanges = {
		reps: [...set.reps, rep ],
		removed: false
	};
	if (set.reps.length === 0) {
		setChanges.startTime = new Date();
	}
	setChanges.endTime = new Date();

	let newSet = Object.assign({}, set, setChanges);
	let newWorkoutData = [
		...workoutData.slice(0, workoutData.length-1), // copy all but the last element
		newSet
	];

	return Object.assign({}, state, {
		workoutData: newWorkoutData
	});
};

// UPDATE_WORKOUT_REP

const updateWorkoutRep = (state, action) => {
	// copy workout data
	let newWorkoutData = state.workoutData.slice(0);

	// get set
	let setIndex = newWorkoutData.findIndex( set => set.setID === action.setID );
	let set = newWorkoutData[setIndex];
	var setID = set.setID;

	// update set and its rep
	newWorkoutData[setIndex] = setWithUpdatedRep(set, action.repIndex, action.removed);

	// state
	let stateChanges = {
		workoutData: newWorkoutData
	};

	return Object.assign({}, state, stateChanges);
};

// UPDATE_HISTORY_REP

const updateHistoryRep = (state, action) => {
	// define vars
	let setID = action.setID;
	let historyData = state.historyData;
	let newSet = setWithUpdatedRep(historyData[setID], action.repIndex, action.removed);

	// history
	let historyChanges = {};
	historyChanges[setID] = newSet;
	let newHistoryData = Object.assign({}, state.historyData, historyChanges);

	// state
	let stateChanges = {
		historyData: newHistoryData
	};
	if (!state.setIDsToUpload.includes(setID)) {
		stateChanges.setIDsToUpload = [...state.setIDsToUpload, setID];
	}

	return Object.assign({}, state, stateChanges);
};

// Update rep helper function

const setWithUpdatedRep = (set, repIndex, removed) => {
	// rep
	let rep = set.reps[repIndex];
	let newRep = Object.assign({}, rep, {
		removed: removed,
		data: [...rep.data]
	});

	// reps
	let newReps = [
		...set.reps.slice(0, repIndex),
		newRep,
		...set.reps.slice(repIndex+1)
	];

	// set removed check
	let activeRep = newReps.find((rep) => { return !rep.removed; });
	let setWasRemoved = activeRep === undefined;

	// set
	let setChanges = {
		reps: newReps,
		removed: setWasRemoved
	};
	return Object.assign({}, set, setChanges);
};

// END_SET

const endSet = (state, action) => {
	let workoutData = state.workoutData;
	let currentSet = workoutData[workoutData.length-1];
	let newWorkoutData = [ ...workoutData, createSet(currentSet.setNumber+1) ];

	return Object.assign({}, state, {
		workoutData: newWorkoutData
	});
};

// LOAD_PERSISTED_SET_DATA

const loadPersistedSetData = (state, action) => {
	return action.sets;
};

// END_WORKOUT

const endWorkout = (state, action) => {
	var workoutSetIDs = [];
	var historyChanges = {};
	var workoutID = uuidV4();
	for (set of state.workoutData) {
		if (set.reps.length > 0) {
			let setID = set.setID;
			set.workoutID = workoutID;
			workoutSetIDs.push(setID);
			historyChanges[setID] = set;
		} else {
			console.log("end working -> ignoring empty set");
		}
	}

	let newSetIDsToUpload = [...state.setIDsToUpload, ...workoutSetIDs];
	let newWorkoutData = [ createSet() ];
	let newHistoryData = Object.assign({}, state.historyData, historyChanges);

	return Object.assign({}, state, {
		workoutData: newWorkoutData,
		historyData: newHistoryData,
		setIDsToUpload: newSetIDsToUpload
	});
};

// BEGIN_UPLOADING_SETS

const beginUploadingSets = (state, action) => {
	return Object.assign({}, state, {
		setIDsBeingUploaded: [...state.setIDsToUpload],
		setIDsToUpload: []
	});
};

// CLEAR_SETS_BEING_UPLOADED

const clearSetsBeingUploaded = (state, action) => {
	return Object.assign({}, state, {
		setIDsBeingUploaded: []
	});
};

// RE_ADD_SETS_TO_UPLOAD

const reAddSetsToUpload = (state, action) => {
	return Object.assign({}, state, {
		setIDsToUpload: [...state.setIDsToUpload, ...state.setIDsBeingUploaded],
		setIDsBeingUploaded: [],
	});
};

// UPDATE_SET_DATA_FROM_SERVER

const updateSetDataFromServer = (state, action) => {
	let newHistoryData = {};
	for (set of action.sets) {
		if (set.setID !== null) { // hack check against a bug that showed up in the development database
			newHistoryData[set.setID] = set;
		}
	}

	return Object.assign({}, state, {
		historyData: newHistoryData,
		revision: action.revision,
		setIDsToUpload: [],
		setIDsBeingUploaded: []
	});
};

// UPDATE_REVISION_FROM_SERVER

const updateRevisionFromServer = (state, action) => {
	return Object.assign({}, state, {
		revision: action.revision,
	});
};

// CLEAR_HISTORY

const clearHistory = (state, action) => {
	return Object.assign({}, state, {
		historyData: {},
		revision: 0,
		setIDsToUpload: [],
		setIDsBeingUploaded: []
	});
};

/////////////////////////////////////////////////////////////////////////////////

// Get last rep time

export const lastRepTime = (state) => {
	var workoutData = state.workoutData;
	if (workoutData.length <= 0) {
		return null;
	}

	// check the current set for end time
	var currentSet = workoutData[workoutData.length-1];
	if (currentSet.endTime !== null) {
		return currentSet.endTime;
	}

	// check the previous set for end time
	if (state.workoutData.length > 1) {
		var previousSet = workoutData[workoutData.length-2];
		if (previousSet.endTime !== null) {
			return previousSet.endTime;
		}
	}

	// no end times found
	return null;
}

// Get Workout Sets

export const getWorkoutSets = (state) => {
	return state.workoutData;
};

// Get Expanded Workout Set

export const getExpandedWorkoutSet = (state, setID) => {
	return state.workoutData.find( set => set.setID == setID );
};

// Dictionary to Aarry

const dictToArray = (dictionary) => {
	var array = [];
	for (var property in dictionary) {
		if (dictionary.hasOwnProperty(property)) {
			array.push(dictionary[property]);
		}
	}
	return array;
};

// Get History Sets

export const getHistorySetsChronological = (state) => {
	var array = dictToArray(state.historyData);
	array.sort((set1, set2) => new Date(set1.startTime) - new Date(set2.startTime));
	return array;
};

// Get Expanded History Set

export const getExpandedHistorySet = (state, setID) => {
	var dictionary = state.historyData;
	for (var property in dictionary) {
		if (dictionary.hasOwnProperty(property)) {
			let set = dictionary[property];
			if (set.setID === setID) {
				return set;
			}
		}
	}
	return null;
};

// Get Sets To Upload
export const getSetsToUpload = (state) => {
	return state.setIDsToUpload.map( setID => state.historyData[setID] );
};

// Has Changes To Sync
export const hasChangesToSync = (state) => {
	return (state.setIDsToUpload.length > 0 || state.setIDsBeingUploaded.length > 0);
};

export default SetReducer;
