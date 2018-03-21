import {
    START_RECORDING_1RM,
    STOP_RECORDING_1RM,
    DISMISS_1RM_VIDEO_RECORDER,
    SAVE_WORKOUT_VIDEO,
    SAVE_HISTORY_VIDEO,
    SAVE_VIDEO_ERROR,
    TOGGLE_1RM_VIDEO_RECORDER_CAMERA_TYPE,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

export const startRecording = (setID) => (dispatch, getState) => {
    const state = getState();
    logStartRecordingVideoAnalytics(state, setID);

    dispatch({
        type: START_RECORDING_1RM,
        setID: setID,
    });
};

export const stopRecording = () => ({
    type: STOP_RECORDING_1RM,
});

export const dismissRecording = (setID) => (dispatch, getState) => {
    const state = getState();
    logCancelRecordVideoAnalytics(state, setID);
    Analytics.setCurrentScreen('one_rm_edit_set');
    
    dispatch({
        type: DISMISS_1RM_VIDEO_RECORDER,
    });
};

export const saveVideo = (setID, videoFileURL, videoType) => (dispatch, getState) => {
    const state = getState();
    logSaveVideoAnalytics(state, setID);

    if (SetsSelectors.getIsWorkoutSet(state, setID)) {
        dispatch({
            type: SAVE_WORKOUT_VIDEO,
            setID: setID,
            videoFileURL: videoFileURL,
            videoType: videoType,
        });
    } else {
        dispatch({
            type: SAVE_HISTORY_VIDEO,
            setID: setID,
            videoFileURL: videoFileURL,
            videoType: videoType,
        });
    }
};

export const saveVideoError = (setID, error) => (dispatch, getState) => {
    const state = getState();
    logSaveVideoErrorAnalytics(state, setID, error);

    dispatch({
        type: SAVE_VIDEO_ERROR,
    });
};

export const toggleCameraType = () => ({
    type: TOGGLE_1RM_VIDEO_RECORDER_CAMERA_TYPE,
});

const logStartRecordingVideoAnalytics = (state, setID) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);
    
    Analytics.logEventWithAppState('start_recording_video', {
        is_working_set: is_working_set,
        set_id: setID,
    }, state);
};

const logSaveVideoAnalytics = (state, setID) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('save_video', {
        is_working_set: is_working_set,
        set_id: setID,
    }, state);
};

const logCancelRecordVideoAnalytics = (state, setID) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('cancel_record_video', {
        is_working_set: is_working_set,
        set_id: setID,
    }, state);
};

const logSaveVideoErrorAnalytics = (state, setID, error) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logErrorWithAppState(error, 'save_video_error', {
        is_working_set: is_working_set,
        set_id: setID,
    }, state);
};
