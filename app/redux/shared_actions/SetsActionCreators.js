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
import * as Analytics from 'app/utility/Analytics';

export const getDefaultMetric = () => (dispatch, getState) => {
    var state = getState();
    var defaultMetric = state.settings.defaultMetric;

    dispatch({ 
        type: SAVE_DEFAULT_METRIC, 
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

export const endSet = (was_sanity_check=false, duration=0, manually_started=false) => (dispatch, getState) => {
    var state = getState();
    var workoutData = state.sets.workoutData;
    var set = workoutData[workoutData.length - 1];
    var prevSet = workoutData[workoutData.length - 2];
    var defaultMetric = state.settings.defaultMetric;
    var num_fields_entered = 0;
    var is_previous_set_fields_filled = null;
    var previous_set_has_reps = Boolean(prevSet.reps.length);
    let fields = [set.exercise, set.weight, set.rpe, set.tags.length];
    let prevFields = [];
    
    let endSetTimerDuration = SettingsSelectors.getEndSetTimerDuration;

    var is_default_end_timer = endSetTimerDuration > 30;

    if (prevSet) {
        prevFields = [prevSet.exercise, prevSet.weight, prevSet.rpe, prevSet.tags.length];
        if (prevFields.length > 0) {
           is_previous_set_fields_filled = 0;
        } else {
            is_previous_set_fields_filled = 1
        }
    } else {
        is_previous_set_filled = -1;
    }

    fields.forEach((field) => {
        if (Boolean(field)) {
            num_fields_entered++;
        }
    });


    Analytics.logEventWithAppState('start_new_set', {   
        value: num_fields_entered,
        auto_end_timer: duration / 1000,
        has_exercise_name: Boolean(set.exercise),
        has_weight: Boolean(set.weight),
        has_rpe: Boolean(set.rpe),
        has_tags: Boolean(set.tags.length),
        has_video: Boolean(set.videoFileURL),
        has_reps: Boolean(set.reps.length),
        is_previous_set_fields_filled: is_previous_set_fields_filled,
        is_default_end_timer: is_default_end_timer,
        manually_started: manually_started,
        was_sanity_check: was_sanity_check,
        previous_set_has_reps: previous_set_has_reps      
    }, state);

    // check if set form has any data
    if (!SetEmptyCheck.isUntouched(set)) {
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
