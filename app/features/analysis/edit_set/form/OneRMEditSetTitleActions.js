import {
    PRESENT_1RM_EXERCISE,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

export const presentExercise = (setID, exercise, bias) => (dispatch, getState) => {
    const state = getState();
    Analytics.setCurrentScreen('one_rm_edit_set_exercise_name');
    logEditExerciseNameAnalytics(setID, exercise, state);
    dispatch({
        type: PRESENT_1RM_EXERCISE,
        setID: setID,
        exercise: exercise,
        bias: bias,
    });
};

const logEditExerciseNameAnalytics = (setID, exercise, state) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('edit_exercise_name', {
        is_working_set: is_working_set,
    }, state);
};
