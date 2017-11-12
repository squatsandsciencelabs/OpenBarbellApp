import {
    COLLAPSE_HISTORY_SET,
    PRESENT_HISTORY_EXERCISE,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';

export const tapCollapse = (setID) => (dispatch, getState) => {
    // TODO: analytics

    dispatch({
        type: COLLAPSE_HISTORY_SET,
        setID, setID
    });
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
