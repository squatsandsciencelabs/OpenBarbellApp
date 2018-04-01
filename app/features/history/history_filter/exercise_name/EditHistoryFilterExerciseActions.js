import { DISMISS_HISTORY_FILTER_EXERCISE, SAVE_HISTORY_FILTER_EXERCISE } from 'app/configs+constants/ActionTypes';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';
import * as Analytics from 'app/services/Analytics';

export const dismissExercise = () => ({
    type: DISMISS_HISTORY_FILTER_EXERCISE
});

export const cancelExercise = () => ({
    type: DISMISS_HISTORY_FILTER_EXERCISE
});

export const saveExerciseName = (setID = null, exercise) => ({
    type: SAVE_HISTORY_FILTER_EXERCISE,
    exercise: exercise
});
