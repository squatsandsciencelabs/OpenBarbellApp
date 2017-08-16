import {
    SAVE_WORKOUT_SET,
    SAVE_WORKOUT_SET_TAGS,
    SAVE_HISTORY_SET,
    SAVE_HISTORY_SET_TAGS,
    ADD_REP_DATA,
    SAVE_WORKOUT_REP,
    SAVE_HISTORY_REP,
    END_SET,
    LOAD_PERSISTED_SET_DATA,
    END_WORKOUT,
    BEGIN_UPLOADING_SETS,
    FAILED_UPLOAD_SETS,
    UPDATE_SET_DATA_FROM_SERVER,
    FINISH_UPLOADING_SETS,
    LOGIN_SUCCESS,
    LOGOUT
} from 'app/ActionTypes';
import uuidV4 from 'uuid/v4';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

const SetsReducer = (state = createDefaultState(), action) => {
    switch (action.type) {
        case SAVE_WORKOUT_SET:
            return saveWorkoutSet(state, action);
        case SAVE_WORKOUT_SET_TAGS:
            return saveWorkoutSetTags(state, action);
        case SAVE_HISTORY_SET:
            return saveHistorySet(state, action);
        case SAVE_HISTORY_SET_TAGS:
            return saveHistorySetTags(state, action);
        case ADD_REP_DATA:
            return addRepData(state, action);
        case SAVE_WORKOUT_REP:
            return saveWorkoutRep(state, action);
        case SAVE_HISTORY_REP:
            return saveHistoryRep(state, action);
        case END_SET:
            return endSet(state, action);
        case LOAD_PERSISTED_SET_DATA:
            return loadPersistedSetData(state, action);
        // NOTE: it feels weird to have end workout here, but ending a workout affects the SETS not the workout itself, so the set reducer needs to handle it
        case END_WORKOUT:
            return endWorkout(state, action);
        case BEGIN_UPLOADING_SETS:
            return beginUploadingSets(state, action);
        case FAILED_UPLOAD_SETS:
            return failedUploadSets(state, action);
        case UPDATE_SET_DATA_FROM_SERVER:
        case LOGIN_SUCCESS:        
            return updateSetDataFromServer(state, action);
        case LOGOUT:
            return clearHistory(state, action);
        case FINISH_UPLOADING_SETS:
            return finishUploadingSets(state, action);
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

// SAVE_WORKOUT_SET

// NOTE - using one slice to copy, then altering, as the spread operator + slice was buggy and deletes rows
const saveWorkoutSet = (state, action) => {
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

// SAVE_WORKOUT_SET_TAGS

const saveWorkoutSetTags = (state, action) => {
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

// SAVE_HISTORY_SET

const saveHistorySet = (state, action) => {
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

// SAVE_HISTORY_SET_TAGS

const saveHistorySetTags = (state, action) => {
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

// SAVE_WORKOUT_REP

const saveWorkoutRep = (state, action) => {
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

// SAVE_HISTORY_REP

const saveHistoryRep = (state, action) => {
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
            console.tron.log("end working -> ignoring empty set");
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

// FAILED_UPLOAD_SETS

const failedUploadSets = (state, action) => {
    return Object.assign({}, state, {
        setIDsToUpload: [...state.setIDsToUpload, ...state.setIDsBeingUploaded],
        setIDsBeingUploaded: [],
    });
};

// UPDATE_SET_DATA_FROM_SERVER

const updateSetDataFromServer = (state, action) => {
    // valid check
    if (action.sets === null || action.sets === undefined || action.revision === null || action.revision === undefined) {
        return state;
    }

    let newHistoryData = {};
    for (set of action.sets) {
        if (set.setID !== null) { // hack check against a bug that showed up in the development database
            newHistoryData[set.setID] = set;
        }
    }

    return Object.assign({}, state, {
        historyData: newHistoryData,
        revision: action.revision,
        setIDsBeingUploaded: []
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

// FINISH_UPLOADING_SETS

// this clears the sets being uploaded and updates the revision
const finishUploadingSets = (state, action) => {
    return Object.assign({}, state, {
        setIDsBeingUploaded: [],
        revision: action.revision
    });
};

export default SetsReducer;
