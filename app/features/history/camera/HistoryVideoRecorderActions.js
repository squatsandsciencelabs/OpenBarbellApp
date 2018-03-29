import {
    START_RECORDING_HISTORY,
    STOP_RECORDING_HISTORY,
    DISMISS_HISTORY_VIDEO_RECORDER,
    SAVE_HISTORY_VIDEO,
    SAVE_VIDEO_ERROR,
    TOGGLE_HISTORY_CAMERA_TYPE,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';

export const startRecording = (setID) => (dispatch, getState) => {
    const state = getState();
    logStartRecordingVideoAnalytics(state, setID);

    dispatch({
        type: START_RECORDING_HISTORY,
        setID: setID
    });
};

export const stopRecording = () => ({
    type: STOP_RECORDING_HISTORY
});

export const dismissRecording = (setID) => (dispatch, getState) => {
    const state = getState();
    logCancelRecordVideoAnalytics(state, setID);
    Analytics.setCurrentScreen('history');
    
    dispatch({
        type: DISMISS_HISTORY_VIDEO_RECORDER
    });
};

export const saveVideo = (setID, videoFileURL, videoType) => (dispatch, getState) => {
    const state = getState();
    logSaveVideoAnalytics(state, setID);

    dispatch({
        type: SAVE_HISTORY_VIDEO,
        setID: setID,
        videoFileURL: videoFileURL,
        videoType: videoType
    });
};

export const saveVideoError = (setID, error) => (dispatch, getState) => {
    const state = getState();
    logSaveVideoErrorAnalytics(state, setID, error);

    dispatch({
        type: SAVE_VIDEO_ERROR,
    });
};

export const toggleCameraType = () => (dispatch, getState) => {
    const state = getState();
    logToggleCameraAnalytics(state);

    dispatch({
        type: TOGGLE_HISTORY_CAMERA_TYPE,
    });
};

const logStartRecordingVideoAnalytics = (state, setID) => {
    Analytics.logEventWithAppState('start_recording_video', {
        is_working_set: false,
        set_id: setID,
    }, state);
};

const logSaveVideoAnalytics = (state, setID) => {
    const duration = DurationsSelectors.getHistoryVideoRecorderDuration(state);
    
    Analytics.logEventWithAppState('save_video', {
        duration: duration,
        is_working_set: false,
        set_id: setID,
    }, state);    
};

const logCancelRecordVideoAnalytics = (state, setID) => {
    const duration = DurationsSelectors.getHistoryVideoRecorderDuration(state);

    Analytics.logEventWithAppState('cancel_record_video', {
        duration: duration,
        is_working_set: false,
        set_id: setID,
    }, state);    
};

const logSaveVideoErrorAnalytics = (state, setID, error) => {
    const duration = DurationsSelectors.getHistoryVideoRecorderDuration(state);

    Analytics.logErrorWithAppState(error, 'save_video_error', {
        duration: duration,
        is_working_set: false,
        set_id: setID,
    }, state);
};

const logToggleCameraAnalytics = (state) => {
    Analytics.logEventWithAppState('toggle_camera', {
    }, state);
};
