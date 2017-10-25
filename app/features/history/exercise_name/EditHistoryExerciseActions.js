import { DISMISS_HISTORY_EXERCISE } from 'app/ActionTypes';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';
import * as Analytics from 'app/utility/Analytics';

export const dismissExercise = () => {
    Analytics.setCurrentScreen('history');

    return {
        type: DISMISS_HISTORY_EXERCISE
    }
};

export const cancelExercise = (setID) => (dispatch, getState) => {
    var state = getState();

    Analytics.setCurrentScreen('history');

    logCancelEditExerciseNameAnalytics(setID, state);

    dispatch({
        type: DISMISS_HISTORY_EXERCISE
    });
};

export const saveExerciseName = (setID, exercise) => (dispatch, getState) => {
    var state = getState();
    
    logSaveExerciseNameAnalytics(setID, exercise, state);
    
    dispatch(SetsActionCreators.saveHistorySet(setID, exercise));
};

const logSaveExerciseNameAnalytics = (setID, exercise, state) => {
    let duration = DurationsSelectors.getEditHistoryExerciseDuration(state);

    Analytics.logEventWithAppState('save_exercise_name', {
        value: duration,
        duration: duration,
        is_working_set: false
    }, state);
};

const logCancelEditExerciseNameAnalytics = (setID, state) => {
    let duration = DurationsSelectors.getEditHistoryExerciseDuration(state);

    Analytics.logEventWithAppState('cancel_edit_exercise_name', {
        value: duration,
        duration: duration,
        is_working_set: false
    }, state);
};
