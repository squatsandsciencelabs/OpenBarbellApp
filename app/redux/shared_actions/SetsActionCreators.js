import {
    SAVE_WORKOUT_SET,
    SAVE_HISTORY_SET,
    SAVE_DEFAULT_METRIC,
    END_SET,
    BEGIN_UPLOADING_SETS,
    RE_ADD_SETS_TO_UPLOAD,
    UPDATE_SET_DATA_FROM_SERVER,
    FINISH_UPLOADING_SETS,
    FAILED_UPLOAD_SETS,
    DELETE_HISTORY_SET,
    RESTORE_HISTORY_SET,
    DELETE_WORKOUT_SET,
    RESTORE_WORKOUT_SET,
    SAVE_HISTORY_REP,
    SAVE_WORKOUT_REP,
} from 'app/configs+constants/ActionTypes';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as SetUtils from 'app/utility/SetUtils';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';
import * as Analytics from 'app/services/Analytics';

export const getDefaultMetric = () => (dispatch, getState) => {
    var state = getState();
    var defaultMetric = state.settings.defaultMetric;

    dispatch({ 
        type: SAVE_DEFAULT_METRIC, 
        defaultMetric: defaultMetric
    });
}

// WORKOUT

export const saveWorkoutExerciseName = (setID, exercise = null) => saveWorkoutSet(setID, exercise);

export const saveWorkoutForm = (setID, weight = null, metric = null, rpe = null) => {
    return saveWorkoutSet(setID, null, weight, metric, rpe);
}        

const saveWorkoutSet = (setID, exercise = null, weight = null, metric = null, rpe = null) => {   
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
        action.rpe = fixRPE(rpe);
    }

    return action;
};

export const deleteWorkoutSet = (setID) => ({
    type: DELETE_WORKOUT_SET,
    setID: setID,
});

export const restoreWorkoutSet = (setID) => ({
    type: RESTORE_WORKOUT_SET,
    setID: setID,
});

export const removeWorkoutRep = (setID, repIndex) => (dispatch, getState) => {
    const state = getState();
    logRemoveRepAnalytics(state, setID, true);

    dispatch({
        type: SAVE_WORKOUT_REP,
        setID: setID,
        repIndex: repIndex,
        removed: true,
    });
};

export const restoreWorkoutRep = (setID, repIndex) => (dispatch, getState) => {
    const state = getState();
    logRestoreRepAnalytics(state, setID, true);

    dispatch({
        type: SAVE_WORKOUT_REP,
        setID: setID,
        repIndex: repIndex,
        removed: false,
    });
};

export const endSet = (manuallyStarted=false, wasSanityCheck=false) => (dispatch, getState) => {
    const state = getState();
    const set = SetsSelectors.getWorkingSet(state);
    
    // check if set form has any data
    if (!SetUtils.isUntouched(set)) {
        logEndSetAnalytics(manuallyStarted, wasSanityCheck, state);
        const defaultMetric = state.settings.defaultMetric;        

        dispatch({
            type: END_SET,
            defaultMetric: defaultMetric
        });
    }
};

// HISTORY

export const saveHistoryExerciseName = (setID, exercise = null) => saveHistorySet(setID, exercise);

export const saveHistoryForm = (setID, weight = null, metric = null, rpe = null) => {
    return saveHistorySet(setID, null, weight, metric, rpe);
}    

const saveHistorySet = (setID, exercise = null, weight = null, metric = null, rpe = null) => {
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
        action.rpe = fixRPE(rpe);
    }

    return action;
};

export const deleteHistorySet = (setID) => ({
    type: DELETE_HISTORY_SET,
    setID: setID,
});

export const restoreHistorySet = (setID) => ({
    type: RESTORE_HISTORY_SET,
    setID: setID,
});

export const removeHistoryRep = (setID, repIndex) => (dispatch, getState) => {
    const state = getState();
    logRemoveRepAnalytics(state, setID);

    dispatch({
        type: SAVE_HISTORY_REP,
        setID: setID,
        repIndex: repIndex,
        removed: true
    });
};

export const restoreHistoryRep = (setID, repIndex) => (dispatch, getState) => {
    const state = getState();
    logRestoreRepAnalytics(state, setID);

    dispatch({
        type: SAVE_HISTORY_REP,
        setID: setID,
        repIndex: repIndex,
        removed: false
    });
};

// SYNCING

export const beginUploadingSets = () => ({ type: BEGIN_UPLOADING_SETS });

export const updateSetDataFromServer = (revision, sets=null, syncDate=new Date()) => ({
    type: UPDATE_SET_DATA_FROM_SERVER,
    sets: sets,
    revision: revision,
    syncDate: syncDate
});

export const finishedUploadingSets = (revision=null) => ({
    type: FINISH_UPLOADING_SETS,
    revision: revision
});

export const failedUploadSets = () => ({ type: FAILED_UPLOAD_SETS });

// UTILITY

const fixRPE = (rpe) => {
    if (rpe === null || rpe === '') {
        return rpe;
    }

    const rpeWithoutCommas = rpe.replace(',','.');

    if (Number(rpeWithoutCommas) <= 5.5 || isNaN(rpeWithoutCommas)) {
        if (rpe.includes(',')) {
            return '< 5,5';
        } else {
            return '< 5.5';
        }
    }

    if (Number(rpeWithoutCommas) > 10) {
        return '10';
    }

    return rpe;
};

// ANALYTICS

const logEndSetAnalytics = (manuallyStarted, wasSanityCheck, state) => {
    var set = SetsSelectors.getWorkingSet(state);
    var previous_set_has_reps = !SetsSelectors.getWorkoutPreviousSetHasEmptyReps(state);
    var is_previous_set_fields_filled = SetsSelectors.getIsPreviousWorkoutSetFilled(state);
    let num_fields_entered = SetUtils.numFieldsEntered(set);
    let has_reps = !SetUtils.hasEmptyReps(set);
    let auto_end_timer = 0;
    let endSetTimerDuration = SettingsSelectors.getEndSetTimerDuration(state);
    let is_default_end_timer = !SettingsSelectors.getIfTimerWasEdited(state);

    if (!manuallyStarted) {
        auto_end_timer = endSetTimerDuration;
    };

    Analytics.logEventWithAppState('start_new_set', {   
        value: num_fields_entered,
        auto_end_timer: auto_end_timer,
        has_exercise_name: Boolean(set.exercise),
        has_weight: Boolean(set.weight),
        has_rpe: Boolean(set.rpe),
        has_tags: Boolean(set.tags.length),
        has_video: Boolean(set.videoFileURL),
        has_reps: has_reps,
        is_previous_set_fields_filled: is_previous_set_fields_filled,
        num_fields_entered: num_fields_entered,
        is_default_end_timer: is_default_end_timer,
        manually_started: manuallyStarted,
        was_sanity_check: wasSanityCheck,
        previous_set_has_reps: previous_set_has_reps      
    }, state);    
};

const logDeleteSetAnalytics = (state, setID) => {
    Analytics.logEventWithAppState('delete_set', {
        is_working_set: false,
    }, state);
};

const logRemoveRepAnalytics = (state, setID, isWorkout=false) => {
    if (isWorkout) {
        var is_working_set = SetsSelectors.getIsWorkingSet(state, setID);
    } else {
        var is_working_set = false;
    }

    Analytics.logEventWithAppState('remove_rep', {
        is_working_set: is_working_set,
        set_id: setID,
    }, state);
};

const logRestoreRepAnalytics = (state, setID, isWorkout=false) => {
    if (isWorkout) {
        var is_working_set = SetsSelectors.getIsWorkingSet(state, setID);
    } else {
        var is_working_set = false;
    }

    Analytics.logEventWithAppState('restore_rep', {
        is_working_set: is_working_set,
        set_id: setID,
    }, state);
};
