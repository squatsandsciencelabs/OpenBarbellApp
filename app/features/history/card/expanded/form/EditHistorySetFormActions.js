import {
    TOGGLE_HISTORY_METRIC,
    PRESENT_HISTORY_TAGS,
    PRESENT_HISTORY_VIDEO_RECORDER,
    PRESENT_HISTORY_VIDEO_PLAYER,
    START_EDITING_HISTORY_RPE,
    START_EDITING_HISTORY_WEIGHT,
    END_EDITING_HISTORY_RPE,
    END_EDITING_HISTORY_WEIGHT,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';

export const toggleMetric = (setID) => (dispatch, getState) => {
    const state = getState();
    logToggleMetricAnalytics(setID, state);
    dispatch({
        type: TOGGLE_HISTORY_METRIC
    });
};

export const editRPE = (setID) => (dispatch, getState) => {
    const state = getState();
    logEditRPEAnalytics(setID, state);
    dispatch({
        type: START_EDITING_HISTORY_RPE
    });
};

export const editWeight = (setID) => (dispatch, getState) => {
    const state = getState();
    logEditWeightAnalytics(setID, state);
    dispatch({
        type: START_EDITING_HISTORY_WEIGHT
    });
};

export const dismissRPE = (setID) => (dispatch, getState) => {
    const state = getState();
    logSaveRPEAnalytics(setID, state);
    dispatch({
        type: END_EDITING_HISTORY_RPE
    });
};

export const dismissWeight = (setID) => (dispatch, getState) => {
    const state = getState();
    logSaveWeightAnalytics(setID, state);
    dispatch({
        type: END_EDITING_HISTORY_WEIGHT
    });
};

export const presentTags = (setID, tags) => (dispatch, getState) => {
    const state = getState();
    Analytics.setCurrentScreen('edit_history_tags');
    logEditTagsAnalytics(setID, state);

    dispatch({
        type: PRESENT_HISTORY_TAGS,
        setID: setID,
        tags: tags
    });
};

export const saveSet = (setID, weight = null, metric = null, rpe = null) => {
    return SetsActionCreators.saveHistoryForm(setID, weight, metric, rpe);
};

export const presentRecordVideo = (setID) => (dispatch, getState) => {
    const state = getState();
    Analytics.setCurrentScreen('history_record_video');
    logVideoRecorderAnalytics(setID, state);

    dispatch({
        type: PRESENT_HISTORY_VIDEO_RECORDER,
        setID: setID,
        isCommentary: false
    });
};

export const presentRecordCommentary = (setID) => (dispatch, getState) => {
    const state = getState();    
    Analytics.setCurrentScreen('history_record_video_log');
    logVideoLogRecorderAnalytics(setID, state);
    
    dispatch({
        type: PRESENT_HISTORY_VIDEO_RECORDER,
        setID: setID,
        isCommentary: true
    });
};

export const presentWatchVideo = (setID, videoFileURL) => (dispatch, getState) => {
    const state = getState();
    Analytics.setCurrentScreen('history_watch_video');
    logWatchVideoAnalytics(setID, state);

    dispatch({
        type: PRESENT_HISTORY_VIDEO_PLAYER,
        setID: setID,
        videoFileURL: videoFileURL
    });
};

const logToggleMetricAnalytics = (setID, state) => {
    Analytics.logEventWithAppState('toggle_weight_metric', {
        is_working_set: false
    }, state);
};

const logSaveWeightAnalytics = (setID, state) => {
    let duration = DurationsSelectors.getEditHistoryWeightDuration(state);

    Analytics.logEventWithAppState('save_weight', {
        value: duration,
        duration: duration,
        is_working_set: false
    }, state);
};

const logSaveRPEAnalytics = (setID, state) => {
    let duration = DurationsSelectors.getEditHistoryRPEDuration(state);

    Analytics.logEventWithAppState('save_rpe', {
        value: duration,
        duration: duration,
        is_working_set: false
    }, state);
};

const logEditRPEAnalytics = (setID, state) => {
    Analytics.logEventWithAppState('edit_rpe', {
        is_working_set: false
    }, state);
};

const logEditWeightAnalytics = (setID, state) => {
    Analytics.logEventWithAppState('edit_weight', {
        is_working_set: false
    }, state);
};

const logEditTagsAnalytics = (setID, state) => {
    Analytics.logEventWithAppState('edit_tags', {
        is_working_set: false
    }, state);
};

const logVideoRecorderAnalytics = (setID, state) => {
    Analytics.logEventWithAppState('video_recorder', {
        is_working_set: false
    }, state);
};

const logVideoLogRecorderAnalytics = (setID, state) => {
    Analytics.logEventWithAppState('video_log_recorder', {
        is_working_set: false
    }, state);
};

const logWatchVideoAnalytics = (setID, state) => {
    Analytics.logEventWithAppState('watch_video', {
        is_working_set: false,
        from_collapsed_card: false,
    }, state);
};
