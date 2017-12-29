import {
    DISMISS_HISTORY_TAGS,
    SAVE_HISTORY_SET_TAGS,
    REMOVE_HISTORY_TAG,
    ADD_HISTORY_TAG,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';

export const dismissComments = () => {
    Analytics.setCurrentScreen('history');
    
    return {
        type: DISMISS_HISTORY_TAGS
    }
};

export const cancelComments = () => (dispatch, getState) => {
    const state = getState();
    Analytics.setCurrentScreen('history');
    logCancelEditCommentsAnalytics(state);

    dispatch({
        type: DISMISS_HISTORY_TAGS
    });
};

export const saveComments = (setID, comments = []) => (dispatch, getState) => {
    const state = getState();
    logSaveCommentsAnalytics(state);

    dispatch({
        type: SAVE_HISTORY_SET_TAGS,
        setID: setID,
        comments: comments
    });
};

export const tappedPill = (setID) => (dispatch, getState) => {
    const state = getState();
    logRemovedCommentAnalytics(state);
    dispatch({
        type: REMOVE_HISTORY_TAG,
    });
};

export const addPill = (setID) => (dispatch, getState) => {
    const state = getState();
    logAddCommentAnalytics(state);
    dispatch({
        type: ADD_HISTORY_TAG,
    });
};

const logSaveCommentsAnalytics = (state) => {
    const duration = DurationsSelectors.getEditHistoryCommentsDuration(state);

    Analytics.logEventWithAppState('save_comments', {
        value: duration,
        duration: duration,
        is_working_set: false,
    }, state);    
};

const logCancelEditCommentsAnalytics = (state) => {
    const duration = DurationsSelectors.getEditHistoryCommentsDuration(state);

    Analytics.logEventWithAppState('cancel_edit_comments', {
        value: duration,
        duration: duration,
        is_working_set: false,
    }, state);
};

const logRemovedCommentAnalytics = (state) => {
    Analytics.logEventWithAppState('remove_comment', {
        is_working_set: false,
    }, state);
};

const logAddCommentAnalytics = (state) => {
    Analytics.logEventWithAppState('add_comment', {
        is_working_set: false,
    }, state);
};
