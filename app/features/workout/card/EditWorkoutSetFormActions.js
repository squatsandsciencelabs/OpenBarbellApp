import {
    PRESENT_WORKOUT_EXERCISE,
    PRESENT_WORKOUT_TAGS
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
