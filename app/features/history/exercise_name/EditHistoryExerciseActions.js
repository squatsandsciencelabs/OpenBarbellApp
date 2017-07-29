import { DISMISS_HISTORY_EXERCISE } from 'app/ActionTypes';
import * as SetActionCreators from 'app/redux/shared_actions/SetActionCreators';

export const dismissExercise = () => ({
    type: DISMISS_HISTORY_EXERCISE
});

export const saveExerciseName = (setID, exercise) => {
    return SetActionCreators.saveHistorySet(setID, exercise);
};
