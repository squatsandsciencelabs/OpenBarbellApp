import {
    COLLAPSE_HISTORY_SET,
    PRESENT_HISTORY_EXERCISE,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';
import * as CollapseExpandHistoryActions from 'app/redux/shared_actions/CollapseExpandHistoryActions';

export const collapseCard = (setID) => (dispatch, getState) => {
    const state = getState();
    logCollapsedCardAnalytics(setID, state);

    dispatch(CollapseExpandHistoryActions.collapseCard(setID));
};

export const presentExercise = (setID, exercise, bias) => (dispatch, getState) => {
    const state = getState();
    Analytics.setCurrentScreen('edit_history_exercise_name');
    logEditExerciseNameAnalytics(setID, exercise, state);
    dispatch({
        type: PRESENT_HISTORY_EXERCISE,
        setID: setID,
        exercise: exercise,
        bias: bias
    });
};

const logEditExerciseNameAnalytics = (setID, exercise, state) => {
    Analytics.logEventWithAppState('edit_exercise_name', {
        is_working_set: false
    }, state);
};

const logCollapsedCardAnalytics = (setID, state) => {
    Analytics.logEventWithAppState('collapsed_card', {
        set_id: setID
    }, state);
};
