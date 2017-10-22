import {
    START_RECORDING_HISTORY,
    STOP_RECORDING_HISTORY,
    DISMISS_HISTORY_VIDEO_RECORDER,
    SAVE_HISTORY_VIDEO
} from 'app/ActionTypes';
import * as Analytics from 'app/utility/Analytics';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';
import * as DurationCalculator from 'app/utility/transforms/DurationCalculator';

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

    dispatch({
        type: SAVE_HISTORY_VIDEO,
        setID: setID,
        videoFileURL: videoFileURL,
        videoType: videoType
    });
};

export const saveVideoError = (setID) => (dispatch, getState) => {
    var state = getState();

    saveVideoErrorAnalytics(state);

    dispatch({
        type: SAVE_VIDEO_ERROR,
    });
}

const saveVideoAnalytics = (state) => {
    let startDate = DurationsSelectors.getHistoryVideoRecorderStart(state);
    let duration = DurationCalculator.getDurationTime(startDate, new Date());  

    Analytics.logEventWithAppState('save_video', {
        duration: duration
    }, state);    
};

const cancelVideoAnalytics = (state) => {
    let startDate = DurationsSelectors.getHistoryVideoRecorderStart(state);
    let duration = DurationCalculator.getDurationTime(startDate, new Date());  

    Analytics.logEventWithAppState('cancel_record_video', {
        duration: duration
    }, state);    
};

const saveVideoErrorAnalytics = (state) => {
    let startDate = DurationsSelectors.getHistoryVideoRecorderStart(state);
    let duration = DurationCalculator.getDurationTime(startDate, new Date());  

    Analytics.logEventWithAppState('save_video_error', {
        duration: duration
    }, state);    
};
