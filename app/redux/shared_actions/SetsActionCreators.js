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
} from 'app/ActionTypes';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as SetEmptyCheck from 'app/utility/transforms/SetEmptyCheck';
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
        action.rpe = rpe;
    }

    return action;
};

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
        action.rpe = rpe;
    }

    return action;
};

export const endSet = (manuallyStarted=false, wasSanityCheck=false) => (dispatch, getState) => {
    const state = getState();
    const set = SetsSelectors.getWorkingSet(state);
    
    // check if set form has any data
    if (!SetEmptyCheck.isUntouched(set)) {
        logEndSetAnalytics(manuallyStarted, wasSanityCheck, state);
        const defaultMetric = state.settings.defaultMetric;        

        dispatch({
            type: END_SET,
            defaultMetric: defaultMetric
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

const logEndSetAnalytics = (manuallyStarted, wasSanityCheck, state) => {
    var set = SetsSelectors.getWorkingSet(state);
    var previous_set_has_reps = !SetsSelectors.getWorkoutPreviousSetHasEmptyReps(state);
    var is_previous_set_fields_filled = SetsSelectors.getIsPreviousWorkoutSetFilled(state);
    let num_fields_entered = SetEmptyCheck.numFieldsEntered(set);
    let has_reps = !SetEmptyCheck.hasEmptyReps(set);
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
