import {
    START_RECORDING_HISTORY,
    STOP_RECORDING_HISTORY,
    DISMISS_HISTORY_VIDEO_RECORDER,
    SAVE_HISTORY_VIDEO
} from 'app/ActionTypes';
import * as Analytics from 'app/utility/Analytics';

export const startRecording = (setID) => ({
    type: START_RECORDING_HISTORY,
    setID: setID
});

export const stopRecording = () => ({
    type: STOP_RECORDING_HISTORY
});

export const dismissRecording = () => (dispatch, getState) => {
    var state = getState();

    cancelVideoAnalytics(state);

    Analytics.setCurrentScreen('history');
    
    dispatch({
        type: DISMISS_HISTORY_VIDEO_RECORDER
    });
};

export const saveVideo = (setID, videoFileURL, videoType) => (dispatch, getState) => {
    var state = getState();

    saveVideoAnalytics(state);

    return {
        type: SAVE_HISTORY_VIDEO,
        setID: setID,
        videoFileURL: videoFileURL,
        videoType: videoType
    }
};

export const saveVideoError = (setID) => (dispatch, getState) => {
    var state = getState();

    saveVideoErrorAnalytics(state);

    return {
        type: SAVE_VIDEO_ERROR,
    }
}

const saveVideoAnalytics = (state) => {
    // let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);
    let startDate = DurationsSelectors.getHistoryVideoRecorderStart(state);
    let duration = DurationCalculator.getDurationTime(startDate, new Date());  

    Analytics.logEventWithAppState('save_video', {
        duration: duration
        // is_working_set: is_working_set
    }, state);    
};

const cancelVideoAnalytics = (state) => {
    // let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);
    let startDate = DurationsSelectors.getHistoryVideoRecorderStart(state);
    let duration = DurationCalculator.getDurationTime(startDate, new Date());  

    Analytics.logEventWithAppState('cancel_record_video', {
        duration: duration
        // is_working_set: is_working_set
    }, state);    
};

const saveVideoErrorAnalytics = (state) => {
    // let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);
    let startDate = DurationsSelectors.getHistoryVideoRecorderStart(state);
    let duration = DurationCalculator.getDurationTime(startDate, new Date());  

    Analytics.logEventWithAppState('save_video_error', {
        duration: duration
        // is_working_set: is_working_set
    }, state);    
};
