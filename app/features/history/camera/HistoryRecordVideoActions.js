import {
    START_RECORDING_HISTORY,
    STOP_RECORDING_HISTORY,
    DISMISS_HISTORY_RECORD_VIDEO,
    SAVE_HISTORY_VIDEO
} from 'app/ActionTypes';

export const startRecording = (setID) => ({
    type: START_RECORDING_HISTORY,
    setID: setID
});

export const stopRecording = () => ({
    type: STOP_RECORDING_HISTORY
});

export const dismissRecording = () => ({
    type: DISMISS_HISTORY_RECORD_VIDEO
});

export const saveVideo = (setID, videoFileURL, videoType) => ({
    type: SAVE_HISTORY_VIDEO,
    setID: setID,
    videoFileURL: videoFileURL,
    videoType: videoType    
})
