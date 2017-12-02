import {
    COLLAPSE_WORKOUT_SET,
    PRESENT_WORKOUT_EXERCISE,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';
import * as CollapseExpandWorkoutActions from 'app/redux/shared_actions/CollapseExpandWorkoutActions';

export const collapseCard = (setID) => (dispatch, getState) => {
    const state = getState();
    logCollapsedCardAnalytics(setID, state);

    dispatch(CollapseExpandWorkoutActions.collapseCard(setID));
};

export const presentExercise = (setID, exercise, bias) => (dispatch, getState) => {
    const state = getState();
    Analytics.setCurrentScreen('edit_workout_exercise_name');
    logEditExerciseNameAnalytics(setID, exercise, state);
    dispatch({
        type: PRESENT_WORKOUT_EXERCISE,
        setID: setID,
        exercise: exercise,
        bias: bias
    });
};

const logEditExerciseNameAnalytics = (setID, exercise, state) => {
    let is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('edit_exercise_name', {
        is_working_set: is_working_set
    }, state);
};

const logCollapsedCardAnalytics = (setID, state) => {
    Analytics.logEventWithAppState('collapsed_card', {
        set_id: setID
    }, state);
};
