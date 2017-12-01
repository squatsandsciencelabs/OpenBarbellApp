import {
    TOGGLE_WORKOUT_METRIC,
    PRESENT_WORKOUT_TAGS,
    START_EDITING_WORKOUT_RPE,
    START_EDITING_WORKOUT_WEIGHT,
    END_EDITING_WORKOUT_RPE,
    END_EDITING_WORKOUT_WEIGHT,
    PRESENT_WORKOUT_VIDEO_RECORDER,
    PRESENT_WORKOUT_VIDEO_PLAYER,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as VideoPermissionsUtils from 'app/utility/VideoPermissionsUtils';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';

export const toggleMetric = (setID) => (dispatch, getState) => {
    const state = getState();
    logToggleMetricAnalytics(setID, state);
    dispatch({
        type: TOGGLE_WORKOUT_METRIC
    });
};

export const editRPE = (setID) => (dispatch, getState) => {
    const state = getState();
    logEditRPEAnalytics(setID, state);
    dispatch({
        type: START_EDITING_WORKOUT_RPE
    });
};

export const editWeight = (setID) => (dispatch, getState) => {
    const state = getState();
    logEditWeightAnalytics(setID, state);
    dispatch({
        type: START_EDITING_WORKOUT_WEIGHT
    });
};

export const dismissRPE = (setID) => (dispatch, getState) => {
    const state = getState();
    logSaveRPEAnalytics(setID, state);
    dispatch({
        type: END_EDITING_WORKOUT_RPE
    });
};

export const dismissWeight = (setID) => (dispatch, getState) => {
    var state = getState();

    logSaveWeightAnalytics(setID, state);

    dispatch({
        type: END_EDITING_WORKOUT_WEIGHT
    });
};

export const presentTags = (setID, tags) => (dispatch, getState) => {
    var state = getState();

    Analytics.setCurrentScreen('edit_workout_tags');

    logEditTagsAnalytics(setID, state);

    dispatch({
        type: PRESENT_WORKOUT_TAGS,
        setID: setID,
        tags: tags
    });
};

export const saveSet = (setID, weight = null, metric = null, rpe = null) => {    
    return SetsActionCreators.saveWorkoutForm(setID, weight, metric, rpe);
};

export const presentRecordVideo = (setID) => (dispatch, getState) => {
    VideoPermissionsUtils.checkRecordingPermissions().then(() => {        
        const state = getState();
        Analytics.setCurrentScreen('workout_record_video');
        logVideoRecorderAnalytics(setID, state);

        dispatch({
            type: PRESENT_WORKOUT_VIDEO_RECORDER,
            setID: setID,
            isCommentary: false
        });
    }).catch(() => {});;
};

export const presentRecordCommentary = (setID) => (dispatch, getState) => {
    VideoPermissionsUtils.checkRecordingPermissions().then(() => {        
        const state = getState();
        Analytics.setCurrentScreen('workout_record_video_log');
        logVideoLogRecorderAnalytics(setID, state);
        
        dispatch({
            type: PRESENT_WORKOUT_VIDEO_RECORDER,
            setID: setID,
            isCommentary: true
        });
    }).catch(() => {});;
};

export const presentWatchVideo = (setID, videoFileURL) => (dispatch, getState) => {
    VideoPermissionsUtils.checkWatchVideoPermissions().then(() => {        
        const state = getState();
        Analytics.setCurrentScreen('workout_watch_video');
        logWatchVideoAnalytics(setID, state);
        
        dispatch({
            type: PRESENT_WORKOUT_VIDEO_PLAYER,
            setID: setID,
            videoFileURL: videoFileURL
        });
    }).catch(() => {});;
};

const logToggleMetricAnalytics = (setID, state) => {
    let is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('toggle_weight_metric', {
        is_working_set: is_working_set
    }, state);    
};

const logSaveWeightAnalytics = (setID, state) => {
    let is_working_set = SetsSelectors.getIsWorkingSet(state, setID);
    let duration = DurationsSelectors.getEditWorkoutWeightDuration(state);

    Analytics.logEventWithAppState('save_weight', {
        value: duration,
        duration: duration,
        is_working_set: is_working_set
    }, state);    
}

const logSaveRPEAnalytics = (setID, state) => {
    let is_working_set = SetsSelectors.getIsWorkingSet(state, setID);
    let duration = DurationsSelectors.getEditWorkoutRPEDuration(state);

    Analytics.logEventWithAppState('save_rpe', {
        value: duration,
        duration: duration,
        is_working_set: is_working_set
    }, state);    
};

const logEditRPEAnalytics = (setID, state) => {
    let is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('edit_rpe', {
        is_working_set: is_working_set
    }, state);       
};

const logEditWeightAnalytics = (setID, state) => {
    let is_working_set = SetsSelectors.getIsWorkingSet(state, setID);
    
    Analytics.logEventWithAppState('edit_weight', {
        is_working_set: is_working_set
    }, state);       
};

const logEditTagsAnalytics = (setID, state) => {
    let is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('edit_tags', {
        is_working_set: is_working_set
    }, state);       
};

const logVideoRecorderAnalytics = (setID, state) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);
    
    Analytics.logEventWithAppState('video_recorder', {
        is_working_set: is_working_set
    }, state);
};

const logVideoLogRecorderAnalytics = (setID, state) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);
    
    Analytics.logEventWithAppState('video_log_recorder', {
        is_working_set: is_working_set
    }, state);
};

const logWatchVideoAnalytics = (setID, state) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);
    
    Analytics.logEventWithAppState('watch_video', {
        is_working_set: is_working_set,
        from_collapsed_card: false,
    }, state);
};
