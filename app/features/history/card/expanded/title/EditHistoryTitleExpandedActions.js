import {
    COLLAPSE_HISTORY_SET,
    PRESENT_HISTORY_EXERCISE,
    PRESENT_HISTORY_VIDEO_PLAYER,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';

export const tapCollapse = (setID) => (dispatch, getState) => {
    // TODO: analytics

    dispatch({
        type: COLLAPSE_HISTORY_SET,
        setID, setID
    });
};

export const presentExercise = (setID, exercise, bias) => (dispatch, getState) => {
    const state = getState();
    Analytics.setCurrentScreen('edit_history_exercise_name');
    logEditExerciseNameAnalytics(setID, exercise, state);
    dispatch({
        type: PRESENT_HISTORY_EXERCISE,
        setID: setID,
        exercise: exercise,
        bias: bias
    });
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

const logEditExerciseNameAnalytics = (setID, exercise, state) => {
    Analytics.logEventWithAppState('edit_exercise_name', {
        is_working_set: false
    }, state);
};

const logWatchVideoAnalytics = (setID, state) => {
    Analytics.logEventWithAppState('watch_video', {
        is_working_set: false
    }, state);
};
