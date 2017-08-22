import {
    SAVE_WORKOUT_SET,
    SAVE_HISTORY_SET,
    SET_DEFAULT_METRIC,
    END_SET,
    BEGIN_UPLOADING_SETS,
    RE_ADD_SETS_TO_UPLOAD,
    UPDATE_SET_DATA_FROM_SERVER,
    FINISH_UPLOADING_SETS,
    FAILED_UPLOAD_SETS
} from 'app/ActionTypes';

export const getDefaultMetric = () => (dispatch, getState) => {
    var state = getState();
    var defaultMetric = state.settings.defaultMetric;

    dispatch({ 
        type: SET_DEFAULT_METRIC, 
        defaultMetric: defaultMetric
    });
}
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

export const saveHistorySet = (setID, exercise = null, weight = null, metric = null, rpe = null) => {
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

    return action;
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

export const updateSetDataFromServer = (revision, sets=null, syncDate=new Date()) => ({
    type: UPDATE_SET_DATA_FROM_SERVER,
    sets: sets,
    revision: revision,
    syncDate: syncDate
});


export const finishedUploadingSets = (revision) => ({
    type: FINISH_UPLOADING_SETS,
    revision: revision
});

export const failedUploadSets = () => ({ type: FAILED_UPLOAD_SETS });


