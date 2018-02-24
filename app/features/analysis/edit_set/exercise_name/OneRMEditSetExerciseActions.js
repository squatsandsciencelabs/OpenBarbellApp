import { DISMISS_1RM_EXERCISE } from 'app/configs+constants/ActionTypes';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as Analytics from 'app/services/Analytics';

export const dismissExercise = () => {
    Analytics.setCurrentScreen('one_rm_edit_set');

    return {
        type: DISMISS_1RM_EXERCISE
    };
};

export const cancelExercise = (setID) => (dispatch, getState) => {
    const state = getState();

    Analytics.setCurrentScreen('one_rm_edit_set');
    logCancelEditExerciseNameAnalytics(setID, state);

    dispatch({
        type: DISMISS_1RM_EXERCISE
    });
};

export const saveExerciseName = (setID, exercise) => (dispatch, getState) => {
    const state = getState();
    
    logSaveExerciseNameAnalytics(setID, exercise, state);
    
    if (SetsSelectors.getIsWorkoutSet(state, setID)) {
        dispatch(SetsActionCreators.saveWorkoutExerciseName(setID, exercise));
    } else {
        dispatch(SetsActionCreators.saveHistoryExerciseName(setID, exercise));
    }
};

const logSaveExerciseNameAnalytics = (setID, exercise, state) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('save_exercise_name', {
        value: duration,
        is_working_set: is_working_set,
    }, state);
};

const logCancelEditExerciseNameAnalytics = (setID, state) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('cancel_edit_exercise_name', {
        value: duration,
        is_working_set: is_working_set,
    }, state);
};
