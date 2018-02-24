import {
    TOGGLE_1RM_METRIC,
    PRESENT_1RM_TAGS,
    PRESENT_1RM_VIDEO_RECORDER,
    PRESENT_1RM_VIDEO_PLAYER,
    START_EDITING_1RM_RPE,
    START_EDITING_1RM_WEIGHT,
    END_EDITING_1RM_RPE,
    END_EDITING_1RM_WEIGHT,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as VideoPermissionsUtils from 'app/utility/VideoPermissionsUtils';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';

export const toggleMetric = (setID) => (dispatch, getState) => {
    const state = getState();
    logToggleMetricAnalytics(setID, state);
    dispatch({
        type: TOGGLE_1RM_METRIC
    });
};

export const editRPE = (setID) => (dispatch, getState) => {
    const state = getState();
    logEditRPEAnalytics(setID, state);
    dispatch({
        type: START_EDITING_1RM_RPE
    });
};

export const editWeight = (setID) => (dispatch, getState) => {
    const state = getState();
    logEditWeightAnalytics(setID, state);
    dispatch({
        type: START_EDITING_1RM_WEIGHT
    });
};

export const dismissRPE = (setID) => (dispatch, getState) => {
    const state = getState();
    logSaveRPEAnalytics(setID, state);
    dispatch({
        type: END_EDITING_1RM_RPE
    });
};

export const dismissWeight = (setID) => (dispatch, getState) => {
    const state = getState();
    logSaveWeightAnalytics(setID, state);
    dispatch({
        type: END_EDITING_1RM_WEIGHT
    });
};

export const presentTags = (setID, tags) => (dispatch, getState) => {
    const state = getState();
    Analytics.setCurrentScreen('one_rm_edit_set_tags');
    logEditTagsAnalytics(setID, state);

    dispatch({
        type: PRESENT_1RM_TAGS,
        setID: setID,
        tags: tags
    });
};

export const saveSet = (setID, weight = null, metric = null, rpe = null) => (dispatch, getState) => {
    const state = getState();

    if (SetsSelectors.getIsWorkoutSet(state, setID)) {
        dispatch(SetsActionCreators.saveWorkoutForm(setID, weight, metric, rpe));
    } else {
        dispatch(SetsActionCreators.saveHistoryForm(setID, weight, metric, rpe));
    }
};

export const presentRecordVideo = (setID) => (dispatch, getState) => {
    VideoPermissionsUtils.checkRecordingPermissions().then(() => {
        const state = getState();
        Analytics.setCurrentScreen('one_rm_edit_set_record_video');
        logVideoRecorderAnalytics(setID, state);
    
        dispatch({
            type: PRESENT_1RM_VIDEO_RECORDER,
            setID: setID,
            isCommentary: false
        });
    }).catch(() => {});
};

export const presentRecordCommentary = (setID) => (dispatch, getState) => {
    VideoPermissionsUtils.checkRecordingPermissions().then(() => {
        const state = getState();    
        Analytics.setCurrentScreen('one_rm_edit_set_record_video_log');
        logVideoLogRecorderAnalytics(setID, state);
        
        dispatch({
            type: PRESENT_1RM_VIDEO_RECORDER,
            setID: setID,
            isCommentary: true
        });
    }).catch(() => {});
};

export const presentWatchVideo = (setID, videoFileURL) => (dispatch, getState) => {
    VideoPermissionsUtils.checkWatchVideoPermissions().then(() => {
        const state = getState();
        Analytics.setCurrentScreen('one_rm_edit_set_watch_video');
        logWatchVideoAnalytics(setID, state);

        dispatch({
            type: PRESENT_1RM_VIDEO_PLAYER,
            setID: setID,
            videoFileURL: videoFileURL
        });
    }).catch(() => {});
};

const logToggleMetricAnalytics = (setID, state) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('toggle_weight_metric', {
        is_working_set: is_working_set,
    }, state);
};

const logSaveWeightAnalytics = (setID, state) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('save_weight', {
        is_working_set: is_working_set,
    }, state);
};

const logSaveRPEAnalytics = (setID, state) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('save_rpe', {
        is_working_set: is_working_set,
    }, state);
};

const logEditRPEAnalytics = (setID, state) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('edit_rpe', {
        is_working_set: is_working_set,
    }, state);
};

const logEditWeightAnalytics = (setID, state) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('edit_weight', {
        is_working_set: is_working_set,
    }, state);
};

const logEditTagsAnalytics = (setID, state) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('edit_tags', {
        is_working_set: is_working_set,
    }, state);
};

const logVideoRecorderAnalytics = (setID, state) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('video_recorder', {
        is_working_set: is_working_set,
    }, state);
};

const logVideoLogRecorderAnalytics = (setID, state) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('video_log_recorder', {
        is_working_set: is_working_set,
    }, state);
};

const logWatchVideoAnalytics = (setID, state) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('watch_video', {
        is_working_set: is_working_set,
        from_collapsed_card: false,
    }, state);
};
