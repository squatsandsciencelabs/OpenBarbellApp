import {
    COLLAPSE_WORKOUT_SET,
    PRESENT_WORKOUT_EXERCISE,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';

export const tapCollapse = (setID) => (dispatch, getState) => {
    // TODO: analytics

    dispatch({
        type: COLLAPSE_WORKOUT_SET,
        setID, setID
    });
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
