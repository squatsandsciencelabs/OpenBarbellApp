import {
    PRESENT_HISTORY_EXERCISE,
    PRESENT_HISTORY_TAGS
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
