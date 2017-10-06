import { DISMISS_WORKOUT_EXERCISE } from 'app/ActionTypes';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as Analytics from 'app/utility/Analytics';

export const dismissExercise = () => {
    Analytics.setCurrentScreen('workout');

    return {
        type: DISMISS_WORKOUT_EXERCISE
    }
};

export const saveExerciseName = (setID, exercise) => {
    return SetsActionCreators.saveWorkoutSet(setID, exercise);
};
