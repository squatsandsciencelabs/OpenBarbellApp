import {
    SAVE_WORKOUT_SET,
    SAVE_HISTORY_SET,
    END_SET,
    BEGIN_UPLOADING_SETS,
    RE_ADD_SETS_TO_UPLOAD,
    CLEAR_SETS_BEING_UPLOADED,
    UPDATE_SET_DATA_FROM_SERVER,
    UPDATE_REVISION_FROM_SERVER,
    CLEAR_HISTORY
} from 'app/ActionTypes';

import * as ApiActionCreators from './ApiActionCreators';
import OpenBarbellConfig from 'app/configs/OpenBarbellConfig.json';

export const saveWorkoutSet = (setID, exercise = null, weight = null, metric = null, rpe = null) => {
    var action  = {
        type: SAVE_WORKOUT_SET
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

export const saveHistorySet = (setID, exercise = null, weight = null, metric = null, rpe = null) => (dispatch) => {
    var action = {
        type: SAVE_HISTORY_SET
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

export const clearHistory = () => ({
    type: CLEAR_HISTORY
});
