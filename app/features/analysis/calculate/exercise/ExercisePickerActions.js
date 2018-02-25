import {
    DISMISS_SELECT_EXERCISE,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as AnalysisActionCreators from 'app/redux/shared_actions/AnalysisActionCreators';

export const dismissSelectExercise = () => (dispatch, getState) => {
    const state = getState();
    logCancelEditExerciseAnalytics(state);
    Analytics.setCurrentScreen('analysis');

    dispatch({ type: DISMISS_SELECT_EXERCISE });
};

export const saveSelected1RMExercise = (exercise = 'Squat') => (dispatch, getState) => {
    const state = getState();
    logSaveExerciseAnalytics(state, exercise);

    dispatch(AnalysisActionCreators.saveSelected1RMExercise(exercise));
};

// ANALYTICS

const logCancelEditExerciseAnalytics = (state) => {
    Analytics.logEventWithAppState('one_rm_cancel_edit_exercise', {
    }, state);
};

const logSaveExerciseAnalytics = (state, exercise) => {
    Analytics.logEventWithAppState('one_rm_select_exercise', {
        to_exercise: exercise,
    }, state);
};
