import {
    DISMISS_EDIT_1RM_SET,
} from 'app/configs+constants/ActionTypes';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as Analytics from 'app/services/Analytics';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as SetUtils from 'app/utility/SetUtils';

export const deleteSet = (setID) => (dispatch, getState) => {
    const state = getState();
    if (SetsSelectors.getIsWorkoutSet(state, setID)) {
        dispatch(SetsActionCreators.deleteWorkoutSet(setID));
    } else {
        dispatch(SetsActionCreators.deleteHistorySet(setID));
    }
};

export const restoreSet = (setID) => (dispatch, getState) => {
    const state = getState();
    if (SetsSelectors.getIsWorkoutSet(state, setID)) {
        dispatch(SetsActionCreators.restoreWorkoutSet(setID));
    } else {
        dispatch(SetsActionCreators.restoreHistorySet(setID));
    }
};

export const removeRep = (setID, repIndex) => (dispatch, getState) => {
    const state = getState();
    if (SetsSelectors.getIsWorkoutSet(state, setID)) {
        dispatch(SetsActionCreators.removeWorkoutRep(setID, repIndex));
    } else {
        dispatch(SetsActionCreators.removeHistoryRep(setID, repIndex));
    }
};

export const restoreRep = (setID, repIndex) => (dispatch, getState) => {
    const state = getState();
    if (SetsSelectors.getIsWorkoutSet(state, setID)) {
        dispatch(SetsActionCreators.restoreWorkoutRep(setID, repIndex));
    } else {
        dispatch(SetsActionCreators.restoreHistoryRep(setID, repIndex));
    }
};

export const dismissEditSet = () => (dispatch, getState) => {
    const state = getState();
    logCloseEditSetAnalytics(state);
    Analytics.setCurrentScreen('analysis');

    dispatch({
        type: DISMISS_EDIT_1RM_SET
    });
};

// ANALYTICS

const logCloseEditSetAnalytics = (state) => {
    const setID = AnalysisSelectors.getSetID(state);
    const set = SetsSelectors.getSet(state, setID);

    const didChangeExercise = AnalysisSelectors.getDidUpdateExerciseName(state, set);
    const didChangeWeight = AnalysisSelectors.getDidUpdateWeight(state, set);
    const didChangeMetric = AnalysisSelectors.getDidUpdateMetric(state, set);
    const didChangeRPE = AnalysisSelectors.getDidUpdateRPE(state, set);
    const didChangeTags = AnalysisSelectors.getDidUpdateTags(state, set);
    const didChangeReps = AnalysisSelectors.getDidUpdateReps(state, set);
    const didDeleteSet = AnalysisSelectors.getDidDeleteSet(state, set);
    const didRestoreSet = AnalysisSelectors.getDidRestoreSet(state, set);
    const wasRemoved = AnalysisSelectors.getWasError(state)

    const didEditSet = didChangeExercise || didChangeWeight || didChangeMetric || didChangeRPE || didChangeTags || didChangeReps || didDeleteSet || didRestoreSet;

    Analytics.logEventWithAppState('one_rm_close_edit_set', {
        did_edit_set: didEditSet,
        did_change_exercise: didChangeExercise,
        did_change_weight: didChangeWeight,
        did_change_metric: didChangeMetric,
        did_change_rpe: didChangeRPE,
        did_change_tags: didChangeTags,
        did_change_reps: didChangeReps,
        did_delete_set: didDeleteSet,
        did_restore_set: didRestoreSet,
        was_removed: wasRemoved,
    }, state);
};
