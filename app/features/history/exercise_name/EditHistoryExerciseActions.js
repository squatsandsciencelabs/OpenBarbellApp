import { DISMISS_HISTORY_EXERCISE } from 'app/ActionTypes';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';
import * as Analytics from 'app/utility/Analytics';
import * as DurationCalculator from 'app/utility/transforms/DurationCalculator';

export const dismissExercise = () => {
    Analytics.setCurrentScreen('history');

    return {
        type: DISMISS_HISTORY_EXERCISE
    }
};

export const cancelExercise = (setID) => (dispatch, getState) => {
    var state = getState();

    Analytics.setCurrentScreen('history');

    cancelExerciseAnalytics(setID, state);

    dispatch({
        type: DISMISS_HISTORY_EXERCISE
    });
};

export const saveExerciseName = (setID, exercise) => (dispatch, getState) => {
    var state = getState();
    
    saveExerciseAnalytics(setID, exercise, state);
    
    dispatch(SetsActionCreators.saveHistorySet(setID, exercise));
};

const saveExerciseAnalytics = (setID, exercise, state) => {
    let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);
    let startDate = DurationsSelectors.getEditHistoryExerciseStart(state);
    let duration = DurationCalculator.getDurationBetween(startDate, new Date());  

    Analytics.logEventWithAppState('save_exercise_name', {
        value: duration,
        duration: duration,
        is_working_set: is_working_set
    }, state);
};

const cancelExerciseAnalytics = (setID, state) => {
    let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);
    let startDate = DurationsSelectors.getEditHistoryExerciseStart(state);
    let duration = DurationCalculator.getDurationBetween(startDate, new Date());  

    Analytics.logEventWithAppState('cancel_edit_exercise_name', {
        value: duration,
        duration: duration,
        is_working_set: is_working_set
    }, state);
};

