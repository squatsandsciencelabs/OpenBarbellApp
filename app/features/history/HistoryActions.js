import {
    PRESENT_HISTORY_EXPANDED,
    LOADING_HISTORY,
    SAVE_HISTORY_REP,
    COLLAPSE_HISTORY_SET,
    EXPAND_HISTORY_SET,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const collapseSet = (setID) => (dispatch, getState) => {
    dispatch({
        type: COLLAPSE_HISTORY_SET,
        setID: setID,
    });
};

export const expandSet = (setID) => (dispatch, getState) => {
    dispatch({
        type: EXPAND_HISTORY_SET,
        setID: setID,
    });
};

export const presentExpanded = (setID) => ({
    type: PRESENT_HISTORY_EXPANDED,
    setID: setID
});

export const finishLoading = () => ({
    type: LOADING_HISTORY,
    isLoading: false
});

export const removeRep = (setID, repIndex) => (dispatch, getState) => {
    const state = getState();
    logRemoveRepAnalytics(state, setID);

    dispatch({
        type: SAVE_HISTORY_REP,
        setID: setID,
        repIndex: repIndex,
        removed: true
    });
};

export const restoreRep = (setID, repIndex) => (dispatch, getState) => {
    const state = getState();
    logRestoreRepAnalytics(state, setID);

    dispatch({
        type: SAVE_HISTORY_REP,
        setID: setID,
        repIndex: repIndex,
        removed: false
    });
};

const logRemoveRepAnalytics = (state, setID) => {
    Analytics.logEventWithAppState('remove_rep', {
        is_working_set: false
    }, state);
};

const logRestoreRepAnalytics = (state, setID) => {
    Analytics.logEventWithAppState('restore_rep', {
        is_working_set: false
    }, state);
};
