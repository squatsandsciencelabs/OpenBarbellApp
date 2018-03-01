import {
    ADD_INCLUDE_TAG,
    REMOVE_INCLUDE_TAG,
    SAVE_INCLUDES_TAGS,
    DISMISS_INCLUDES_TAGS,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const saveTags = (tags = []) => (dispatch, getState) => {
    const state = getState();
    logSaveTagsAnalytics(state);

    dispatch({
        type: SAVE_INCLUDES_TAGS,
        tags: tags,
    });
};

export const dismissTags = () => {
    Analytics.setCurrentScreen('analysis');
    return { type: DISMISS_INCLUDES_TAGS };
};

export const cancelTags = () => (dispatch, getState) => {
    const state = getState();
    logCancelEditTagsAnalytics(state);
    Analytics.setCurrentScreen('analysis');

    dispatch({ type: DISMISS_INCLUDES_TAGS });
};

export const tappedPill = () => (dispatch, getState) => {
    const state = getState();
    logRemovedTagAnalytics(state);

    dispatch({ type: REMOVE_INCLUDE_TAG });
};

export const addPill = () => (dispatch, getState) => {
    const state = getState();
    logAddTagAnalytics(state);

    dispatch({ type: ADD_INCLUDE_TAG });
};

// ANALYTICS

const logSaveTagsAnalytics = (state) => {
    Analytics.logEventWithAppState('one_rm_select_include_tags', {
    }, state);
};

const logCancelEditTagsAnalytics = (state) => {
    Analytics.logEventWithAppState('one_rm_cancel_edit_include_tags', {
    }, state);
};

const logRemovedTagAnalytics = (state) => {
    Analytics.logEventWithAppState('remove_tag', {
    }, state);
};

const logAddTagAnalytics = (state) => {
    Analytics.logEventWithAppState('one_rm_add_tag', {
    }, state);
};
