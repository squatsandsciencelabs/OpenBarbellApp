import {
    START_RECORDING_HISTORY,
    STOP_RECORDING_HISTORY,
    DISMISS_HISTORY_VIDEO_RECORDER,
    SAVE_HISTORY_VIDEO,
    SAVE_VIDEO_ERROR,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';

export const startRecording = (setID) => (dispatch, getState) => {
    const state = getState();
    logStartRecordingVideoAnalytics(setID, state);

    dispatch({
        type: START_RECORDING_HISTORY,
        setID: setID
    });
};

export const stopRecording = () => ({
    type: STOP_RECORDING_HISTORY
});

export const dismissRecording = () => (dispatch, getState) => {
    const state = getState();
    logCancelRecordVideoAnalytics(state);
    Analytics.setCurrentScreen('history');
    
    dispatch({
        type: DISMISS_HISTORY_VIDEO_RECORDER
    });
};

export const saveVideo = (setID, videoFileURL, videoType) => (dispatch, getState) => {
    const state = getState();
    logSaveVideoAnalytics(state);

    dispatch({
        type: SAVE_HISTORY_VIDEO,
        setID: setID,
        videoFileURL: videoFileURL,
        videoType: videoType
    });
};

export const saveVideoError = (setID) => (dispatch, getState) => {
    const state = getState();
    logSaveVideoErrorAnalytics(state);

    dispatch({
        type: SAVE_VIDEO_ERROR,
    });
}

const logStartRecordingVideoAnalytics = (setID, state) => {
    Analytics.logEventWithAppState('start_recording_video', {
        is_working_set: false,
    }, state);
};

const logSaveVideoAnalytics = (state) => {
    const duration = DurationsSelectors.getHistoryVideoRecorderDuration(state);
    
    Analytics.logEventWithAppState('save_video', {
        duration: duration,
        is_working_set: false,
    }, state);    
};

const logCancelRecordVideoAnalytics = (state) => {
    const duration = DurationsSelectors.getHistoryVideoRecorderDuration(state);

    Analytics.logEventWithAppState('cancel_record_video', {
        duration: duration,
        is_working_set: false,        
    }, state);    
};

const logSaveVideoErrorAnalytics = (state) => {
    const duration = DurationsSelectors.getHistoryVideoRecorderDuration(state);

    Analytics.logEventWithAppState('save_video_error', {
        duration: duration,
        is_working_set: false,        
    }, state);    
};
