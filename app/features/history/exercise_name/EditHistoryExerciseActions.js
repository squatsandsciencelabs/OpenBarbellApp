import { DISMISS_HISTORY_EXERCISE } from 'app/ActionTypes';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as Analytics from 'app/utility/Analytics';

export const dismissExercise = () => {
    Analytics.setCurrentScreen('history');

    return {
        type: DISMISS_HISTORY_EXERCISE
    }
};

export const saveExerciseName = (setID, exercise) => {
    return SetsActionCreators.saveHistorySet(setID, exercise);
};
