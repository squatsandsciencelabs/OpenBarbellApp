import {
    PRESENT_HISTORY_EXERCISE,
    PRESENT_HISTORY_TAGS,
    PRESENT_HISTORY_RECORD_VIDEO,
    PRESENT_HISTORY_WATCH_VIDEO
} from 'app/ActionTypes';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';

export const presentExercise = (setID, exercise) => ({
    type: PRESENT_HISTORY_EXERCISE,
    setID: setID,
    exercise: exercise
});

export const presentTags = (setID, tags) => ({
    type: PRESENT_HISTORY_TAGS,
    setID: setID,
    tags: tags
});

export const saveSet = (setID, exercise = null, weight = null, metric = null, rpe = null) => {
    return SetsActionCreators.saveHistorySet(setID, exercise, weight, metric, rpe);
};

export const presentRecordVideo = (setID) => ({
    type: PRESENT_HISTORY_RECORD_VIDEO
});

export const presentWatchVideo = (setID) => ({
    type: PRESENT_HISTORY_WATCH_VIDEO
});
