import {
    DISMISS_HISTORY_TAGS,
    SAVE_HISTORY_SET_TAGS,
    REMOVE_HISTORY_TAG,
    ADD_HISTORY_TAG,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';

export const dismissTags = () => {
    Analytics.setCurrentScreen('history');
    
    return {
        type: DISMISS_HISTORY_TAGS
    }
};

export const cancelTags = () => (dispatch, getState) => {
    const state = getState();
    Analytics.setCurrentScreen('history');
    logCancelEditTagsAnalytics(state);

    dispatch({
        type: DISMISS_HISTORY_TAGS
    });
};

export const saveTags = (setID, tags = []) => (dispatch, getState) => {
    const state = getState();
    logSaveTagsAnalytics(state);

    dispatch({
        type: SAVE_HISTORY_SET_TAGS,
        setID: setID,
        tags: tags
    });
};

export const tappedPill = (setID) => (dispatch, getState) => {
    const state = getState();
    logRemovedTagAnalytics(state);
    dispatch({
        type: REMOVE_HISTORY_TAG,
    });
};

export const addPill = (setID) => (dispatch, getState) => {
    const state = getState();
    logAddTagAnalytics(state);
    dispatch({
        type: ADD_HISTORY_TAG,
    });
};

const logSaveTagsAnalytics = (state) => {
    const duration = DurationsSelectors.getEditHistoryTagsDuration(state);

    Analytics.logEventWithAppState('save_tags', {
        value: duration,
        duration: duration,
        is_working_set: false,
        is_history: true,
    }, state);
};

const logCancelEditTagsAnalytics = (state) => {
    const duration = DurationsSelectors.getEditHistoryTagsDuration(state);

    Analytics.logEventWithAppState('cancel_edit_tags', {
        value: duration,
        duration: duration,
        is_working_set: false,
    }, state);
};

const logRemovedTagAnalytics = (state) => {
    Analytics.logEventWithAppState('remove_tag', {
        is_working_set: false,
    }, state);
};

const logAddTagAnalytics = (state) => {
    Analytics.logEventWithAppState('add_tag', {
        is_working_set: false,
    }, state);
};
