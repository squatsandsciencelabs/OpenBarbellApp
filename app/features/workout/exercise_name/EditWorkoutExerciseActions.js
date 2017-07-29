import { DISMISS_WORKOUT_EXERCISE } from 'app/ActionTypes';
import * as SetActionCreators from 'app/redux/shared_actions/SetActionCreators';

export const dismissExercise = () => ({
    type: DISMISS_WORKOUT_EXERCISE
});

export const saveExerciseName = (setID, exercise) => {
    return SetActionCreators.saveWorkoutSet(setID, exercise);
};
