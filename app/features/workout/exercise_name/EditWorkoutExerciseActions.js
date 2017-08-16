import { DISMISS_WORKOUT_EXERCISE } from 'app/ActionTypes';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';

export const dismissExercise = () => ({
    type: DISMISS_WORKOUT_EXERCISE
});

export const saveExerciseName = (setID, exercise) => {
    return SetsActionCreators.saveWorkoutSet(setID, exercise);
};
