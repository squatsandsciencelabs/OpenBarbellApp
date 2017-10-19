import {
    START_RECORDING_WORKOUT,
    STOP_RECORDING_WORKOUT,
    DISMISS_WORKOUT_VIDEO_RECORDER,
    SAVE_WORKOUT_VIDEO,
    SAVE_VIDEO_ERROR,
} from 'app/ActionTypes';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';
import * as DurationCalculator from 'app/utility/transforms/DurationCalculator';
import * as Analytics from 'app/utility/Analytics';

export const startRecording = (setID) => ({
    type: START_RECORDING_WORKOUT,
    setID: setID
});

export const stopRecording = () => ({
    type: STOP_RECORDING_WORKOUT
});

export const dismissRecording = () => (dispatch, getState) => {
    var state = getState();

    cancelVideoAnalytics(state);

    Analytics.setCurrentScreen('workout');
    
    dispatch({
        type: DISMISS_WORKOUT_VIDEO_RECORDER
    });
};

export const saveVideo = (setID, videoFileURL, videoType) => (dispatch, getState) => {
    var state = getState();

    saveVideoAnalytics(state);

    return {
        type: SAVE_WORKOUT_VIDEO,
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
    let startDate = DurationsSelectors.getWorkoutVideoRecorderStart(state);
    let duration = DurationCalculator.getDurationTime(startDate, new Date());  

    Analytics.logEventWithAppState('save_video', {
        duration: duration
        // is_working_set: is_working_set
    }, state);    
};

const cancelVideoAnalytics = (state) => {
    // let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);
    let startDate = DurationsSelectors.getWorkoutVideoRecorderStart(state);
    let duration = DurationCalculator.getDurationTime(startDate, new Date());  

    Analytics.logEventWithAppState('cancel_record_video', {
        duration: duration
        // is_working_set: is_working_set
    }, state);    
};

const saveVideoErrorAnalytics = (state) => {
    // let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);
    let startDate = DurationsSelectors.getWorkoutVideoRecorderStart(state);
    let duration = DurationCalculator.getDurationTime(startDate, new Date());  

    Analytics.logEventWithAppState('save_video_error', {
        duration: duration
        // is_working_set: is_working_set
    }, state);    
};

