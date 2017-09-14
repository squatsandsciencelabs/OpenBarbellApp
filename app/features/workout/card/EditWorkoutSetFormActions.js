import {
    PRESENT_WORKOUT_EXERCISE,
    PRESENT_WORKOUT_TAGS,
    START_EDITING_WORKOUT_RPE,
    START_EDITING_WORKOUT_WEIGHT,
    PRESENT_WORKOUT_VIDEO_RECORDER,
    PRESENT_WORKOUT_VIDEO_PLAYER,
    END_EDITING_WORKOUT_RPE,
    END_EDITING_WORKOUT_WEIGHT,
} from 'app/ActionTypes';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';

export const presentExercise = (setID, exercise, bias) => ({
    type: PRESENT_WORKOUT_EXERCISE,
    setID: setID,
    exercise: exercise,
    bias: bias
});

export const editRPE = () => ({
    type: START_EDITING_WORKOUT_RPE
});

export const editWeight = () => ({
    type: START_EDITING_WORKOUT_WEIGHT
});

export const dismissRPE = () => ({
    type: END_EDITING_WORKOUT_RPE
});

export const dismissWeight = () => ({
    type: END_EDITING_WORKOUT_WEIGHT
});

export const presentTags = (setID, tags) => ({
    type: PRESENT_WORKOUT_TAGS,
    setID: setID,
    tags: tags
});

export const saveSet = (setID, exercise = null, weight = null, metric = null, rpe = null) => {
    return SetsActionCreators.saveWorkoutSet(setID, exercise, weight, metric, rpe);
};

export const presentRecordVideo = (setID) => ({
    type: PRESENT_WORKOUT_VIDEO_RECORDER,
    setID: setID,
    isCommentary: false
});

export const presentRecordCommentary = (setID) => ({
    type: PRESENT_WORKOUT_VIDEO_RECORDER,
    setID: setID,
    isCommentary: true
});

export const presentWatchVideo = (setID, videoFileURL) => ({
    type: PRESENT_WORKOUT_VIDEO_PLAYER,
    setID: setID,
    videoFileURL: videoFileURL
});
