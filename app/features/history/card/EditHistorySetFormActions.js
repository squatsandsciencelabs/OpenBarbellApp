import {
    PRESENT_HISTORY_EXERCISE,
    PRESENT_HISTORY_TAGS,
    PRESENT_HISTORY_VIDEO_RECORDER,
    PRESENT_HISTORY_VIDEO_PLAYER,
    START_EDITING_HISTORY_RPE,
    START_EDITING_HISTORY_WEIGHT,
    END_EDITING_HISTORY_RPE,
    END_EDITING_HISTORY_WEIGHT,    
} from 'app/ActionTypes';
import * as Analytics from 'app/utility/Analytics';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';

export const presentExercise = (setID, exercise, bias) => (dispatch, getState) => {
    var state = getState();

    Analytics.setCurrentScreen('edit_history_exercise_name');

    logEditExerciseNameAnalytics(setID, exercise, state);

    dispatch({
        type: PRESENT_HISTORY_EXERCISE,
        setID: setID,
        exercise: exercise,
        bias: bias
    });
};

export const editRPE = (setID) => (dispatch, getState) => {
    var state = getState();

    logEditRPEAnalytics(setID, state);

    dispatch({
        type: START_EDITING_HISTORY_RPE
    });
};

export const editWeight = () => ({
    type: START_EDITING_HISTORY_WEIGHT
});

export const dismissRPE = (setID) => (dispatch, getState) => {
    var state = getState();

    logSaveRPEAnalytics(setID, state);

    dispatch({
        type: END_EDITING_HISTORY_RPE
    });
};

export const dismissWeight = (setID) => (dispatch, getState) => {
    var state = getState();

    logSaveWeightAnalytics(setID, state);

    dispatch({
        type: END_EDITING_HISTORY_WEIGHT
    });
};

export const presentTags = (setID, tags) => (dispatch, getState) => {
    var state = getState();

    Analytics.setCurrentScreen('edit_history_tags');

    logEditTagsAnalytics(setID, state);

    dispatch({
        type: PRESENT_HISTORY_TAGS,
        setID: setID,
        tags: tags
    });
};

export const saveSet = (setID, exercise = null, weight = null, metric = null, rpe = null) => {
    return SetsActionCreators.saveHistorySet(setID, exercise, weight, metric, rpe);
};

export const presentRecordVideo = (setID) => {
    Analytics.setCurrentScreen('history_record_video');

    return {
        type: PRESENT_HISTORY_VIDEO_RECORDER,
        setID: setID,
        isCommentary: false
    }
};

export const presentRecordCommentary = (setID) => {
    Analytics.setCurrentScreen('history_record_video_log');

    return {
        type: PRESENT_HISTORY_VIDEO_RECORDER,
        setID: setID,
        isCommentary: true
    }
};

export const presentWatchVideo = (setID, videoFileURL) => {
    Analytics.setCurrentScreen('history_watch_video');

    return {
        type: PRESENT_HISTORY_VIDEO_PLAYER,
        setID: setID,
        videoFileURL: videoFileURL
    }
};

const logEditExerciseNameAnalytics = (setID, exercise, state) => {
    let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);

    Analytics.logEventWithAppState('edit_exercise_name', {
        is_working_set: is_working_set
    }, state);
};

const logSaveWeightAnalytics = (setID, state) => {
    let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);
    let startDate = DurationsSelectors.getEditHistoryWeightStart(state);
    let duration = DurationsSelectors.getDurationBetween(startDate, new Date());  

    Analytics.logEventWithAppState('save_weight', {
        value: duration,
        duration: duration,
        is_working_set: is_working_set
    }, state);    
};

const logSaveRPEAnalytics = (setID, state) => {
    let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);
    let startDate = DurationsSelectors.getEditHistoryRPEStart(state);
    let duration = DurationsSelectors.getDurationBetween(startDate, new Date());  

    Analytics.logEventWithAppState('save_rpe', {
        value: duration,
        duration: duration,
        is_working_set: is_working_set
    }, state);    
};

const logEditRPEAnalytics = (setID, state) => {
    let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);

    Analytics.logEventWithAppState('edit_rpe', {
        is_working_set: is_working_set
    }, state);       
};

const logEditTagsAnalytics = (setID, state) => {
    let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);

    Analytics.logEventWithAppState('edit_tags', {
        is_working_set: is_working_set
    }, state);       
};
