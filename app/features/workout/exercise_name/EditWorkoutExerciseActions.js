import { DISMISS_WORKOUT_EXERCISE } from 'app/ActionTypes';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';
import * as Analytics from 'app/services/Analytics';

export const dismissExercise = (setID, exercise) => {
    Analytics.setCurrentScreen('workout');

    return {
        type: DISMISS_WORKOUT_EXERCISE
    };
};

export const cancelExercise = (setID) => (dispatch, getState) => {
    var state = getState();

    Analytics.setCurrentScreen('workout');

    logCancelEditExerciseNameAnalytics(setID, state);

    dispatch({
        type: DISMISS_WORKOUT_EXERCISE
    });
};

export const saveExerciseName = (setID, exercise) => (dispatch, getState) => {
    var state = getState();
    
    logSaveExerciseNameAnalytics(setID, exercise, state);
    
    dispatch(SetsActionCreators.saveWorkoutSet(setID, exercise));
};

const logSaveExerciseNameAnalytics = (setID, exercise, state) => {
    let is_working_set = SetsSelectors.getIsWorkingSet(state, setID);
    let duration = DurationsSelectors.getEditWorkoutExerciseDuration(state);

    Analytics.logEventWithAppState('save_exercise_name', {
        value: duration,
        duration: duration,
        is_working_set: is_working_set
    }, state);
};

const logCancelEditExerciseNameAnalytics = (setID, state) => {
    let is_working_set = SetsSelectors.getIsWorkingSet(state, setID);
    let duration = DurationsSelectors.getEditWorkoutExerciseDuration(state); 

    Analytics.logEventWithAppState('cancel_edit_exercise_name', {
        value: duration,
        duration: duration,
        is_working_set: is_working_set
    }, state);
};
