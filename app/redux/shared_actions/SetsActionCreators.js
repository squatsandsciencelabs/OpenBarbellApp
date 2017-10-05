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
    Analytics.setUserProp('is_workout_in_progress', true);
    
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
    var set = workoutData[workoutData.length - 1];
    var defaultMetric = state.settings.defaultMetric;
    var num_fields_entered = 0;
    let fields = [set.exercise, set.weight, set.rpe, set.tags.length];
    
    fields.forEach((field) => {
        if (Boolean(field)) {
            num_fields_entered++;
        }
    });

    Analytics.logEvent(start_new_set, { value: num_fields_entered });
    Analytics.logEvent(start_new_set, { has_exercise_name: Boolean(set.exercise) });
    Analytics.logEvent(start_new_set, { has_weight: Boolean(set.weight) });
    Analytics.logEvent(start_new_set, { has_rpe: Boolean(set.rpe) });
    Analytics.logEvent(start_new_set, { has_tags: Boolean(set.tags.length) });
    Analytics.logEvent(start_new_set, { has_video: Boolean(set.videoFileURL) }):
    Analytics.logEvent(start_new_set, { has_reps: Boolean(set.reps.length) });

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
