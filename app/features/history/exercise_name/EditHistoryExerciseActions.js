import { DISMISS_HISTORY_EXERCISE } from 'app/ActionTypes';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';

export const dismissExercise = () => ({
    type: DISMISS_HISTORY_EXERCISE
});

export const saveExerciseName = (setID, exercise) => {
    return SetsActionCreators.saveHistorySet(setID, exercise);
};
