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

export const dismissRecording = () => {
    Analytics.setCurrentScreen('history');
    
    return {
        type: DISMISS_HISTORY_VIDEO_RECORDER
    }
};

export const saveVideo = (setID, videoFileURL, videoType) => ({
    type: SAVE_HISTORY_VIDEO,
    setID: setID,
    videoFileURL: videoFileURL,
    videoType: videoType    
})
