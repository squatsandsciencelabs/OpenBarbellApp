import {
    PRESENT_WORKOUT_EXERCISE,
    PRESENT_WORKOUT_TAGS,
    PRESENT_WORKOUT_RECORD_VIDEO,
    PRESENT_WORKOUT_WATCH_VIDEO
} from 'app/ActionTypes';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';

export const presentExercise = (setID, exercise, bias) => ({
    type: PRESENT_WORKOUT_EXERCISE,
    setID: setID,
    exercise: exercise,
    bias: bias
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
    type: PRESENT_WORKOUT_RECORD_VIDEO,
    setID: setID
});

export const presentWatchVideo = (setID) => ({
    type: PRESENT_WORKOUT_WATCH_VIDEO,
});
