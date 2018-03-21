import {
    START_RECORDING_WORKOUT,
    STOP_RECORDING_WORKOUT,
    DISMISS_WORKOUT_VIDEO_RECORDER,
    SAVE_WORKOUT_VIDEO,
    SAVE_VIDEO_ERROR,
    TOGGLE_WORKOUT_CAMERA_TYPE,
} from 'app/configs+constants/ActionTypes';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';
import * as Analytics from 'app/services/Analytics';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

export const startRecording = (setID) => (dispatch, getState) => {
    const state = getState();
    logStartRecordingVideoAnalytics(state, setID);

    dispatch({
        type: START_RECORDING_WORKOUT,
        setID: setID
    });
};

export const stopRecording = () => ({
    type: STOP_RECORDING_WORKOUT
});

export const dismissRecording = (setID) => (dispatch, getState) => {
    const state = getState();
    logCancelRecordVideoAnalytics(state, setID);
    Analytics.setCurrentScreen('workout');
    
    dispatch({
        type: DISMISS_WORKOUT_VIDEO_RECORDER
    });
};

export const saveVideo = (setID, videoFileURL, videoType) => (dispatch, getState) => {
    const state = getState();
    logSaveVideoAnalytics(state, setID);

    dispatch({
        type: SAVE_WORKOUT_VIDEO,
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

export const toggleCameraType = () => ({
    type: TOGGLE_WORKOUT_CAMERA_TYPE,
});

const logStartRecordingVideoAnalytics = (state, setID) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);
    
    Analytics.logEventWithAppState('start_recording_video', {
        is_working_set: is_working_set,
        set_id: setID,
    }, state);
};

const logSaveVideoAnalytics = (state, setID) => {
    const duration = DurationsSelectors.getWorkoutVideoRecorderDuration(state);
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('save_video', {
        duration: duration,
        is_working_set: is_working_set,
        set_id: setID,
    }, state);
};

const logCancelRecordVideoAnalytics = (state, setID) => {
    const duration = DurationsSelectors.getWorkoutVideoRecorderDuration(state);
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('cancel_record_video', {
        duration: duration,
        is_working_set: is_working_set,
        set_id: setID,
    }, state);
};

const logSaveVideoErrorAnalytics = (state, setID, error) => {
    const duration = DurationsSelectors.getWorkoutVideoRecorderDuration(state);
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logErrorWithAppState(error, 'save_video_error', {
        duration: duration,
        is_working_set: is_working_set,
        set_id: setID,
    }, state);
};
