import {
    DISMISS_WORKOUT_TAGS,
    SAVE_WORKOUT_SET_TAGS,
    REMOVE_WORKOUT_TAG,
    ADD_WORKOUT_TAG,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

export const dismissComments = () => {
    Analytics.setCurrentScreen('workout');
    
    return {
        type: DISMISS_WORKOUT_TAGS
    };
};

export const cancelComments = (setID) => (dispatch, getState) => {
    const state = getState();
    Analytics.setCurrentScreen('workout');
    logCancelEditCommentsAnalytics(state, setID);

    dispatch({
        type: DISMISS_WORKOUT_TAGS
    });
};

export const saveComments = (setID, comments = []) => (dispatch, getState) => {
    const state = getState();
    logSaveCommentsAnalytics(state, setID);
    dispatch({
        type: SAVE_WORKOUT_SET_TAGS,
        setID: setID,
        comments: comments
    });
};

export const tappedPill = (setID) => (dispatch, getState) => {
    const state = getState();
    logRemovedCommentAnalytics(state, setID);
    dispatch({
        type: REMOVE_WORKOUT_TAG,
    });
};

export const addPill = (setID) => (dispatch, getState) => {
    const state = getState();
    logAddCommentAnalytics(state, setID);
    dispatch({
        type: ADD_WORKOUT_TAG,
    });
};

const logSaveCommentsAnalytics = (state, setID) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);
    const duration = DurationsSelectors.getEditWorkoutCommentsDuration(state);

    Analytics.logEventWithAppState('save_comments', {
        value: duration,
        duration: duration,
        is_working_set: is_working_set,
    }, state);    
};

const logCancelEditCommentsAnalytics = (state, setID) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);
    const duration = DurationsSelectors.getEditWorkoutCommentsDuration(state);

    Analytics.logEventWithAppState('cancel_edit_comments', {
        value: duration,
        duration: duration,
        is_working_set: is_working_set,
    }, state);
};

const logRemovedCommentAnalytics = (state, setID) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('remove_comment', {
        is_working_set: is_working_set,
    }, state);
};

const logAddCommentAnalytics = (state, setID) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);
    
    Analytics.logEventWithAppState('add_comment', {
        is_working_set: is_working_set,
    }, state);
};
