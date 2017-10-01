import {
    START_RECORDING_WORKOUT,
    STOP_RECORDING_WORKOUT,
    DISMISS_WORKOUT_VIDEO_RECORDER,
    SAVE_WORKOUT_VIDEO
} from 'app/ActionTypes';

export const startRecording = (setID) => ({
    type: START_RECORDING_WORKOUT,
    setID: setID
});

export const stopRecording = () => ({
    type: STOP_RECORDING_WORKOUT
});

export const dismissRecording = () => {
    Analytics.setCurrentScreen('workout');
    
    return {
        type: DISMISS_WORKOUT_VIDEO_RECORDER
    }
};

export const saveVideo = (setID, videoFileURL, videoType) => ({
    type: SAVE_WORKOUT_VIDEO,
    setID: setID,
    videoFileURL: videoFileURL,
    videoType: videoType
})
