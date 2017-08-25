import {
    START_RECORDING_WORKOUT,
    STOP_RECORDING_WORKOUT,
    DISMISS_WORKOUT_RECORD_VIDEO
} from 'app/ActionTypes';

export const startRecording = (setID) => ({
    type: START_RECORDING_WORKOUT,
    setID: setID
});

export const stopRecording = () => ({
    type: STOP_RECORDING_WORKOUT
});

export const dismissRecording = () => ({
    type: DISMISS_WORKOUT_RECORD_VIDEO
});
