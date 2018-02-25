import {
    ADD_EXCLUDE_TAG,
    REMOVE_EXCLUDE_TAG,
    SAVE_EXCLUDES_TAGS,
    DISMISS_EXCLUDES_TAGS,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const saveTags = (tags = []) => (dispatch, getState) => {
    const state = getState();
    logSaveTagsAnalytics(state);
    Analytics.setCurrentScreen('analysis');

    dispatch({
        type: SAVE_EXCLUDES_TAGS,
        tags: tags,
    });
};

export const cancelTags = () => (dispatch, getState) => {
    const state = getState();
    logCancelEditTagsAnalytics(state);
    Analytics.setCurrentScreen('analysis');

    dispatch({ type: DISMISS_EXCLUDES_TAGS });
};

export const tappedPill = () => (dispatch, getState) => {
    const state = getState();
    logRemovedTagAnalytics(state);

    dispatch({ type: REMOVE_EXCLUDE_TAG });
};

export const addPill = () => (dispatch, getState) => {
    const state = getState();
    logAddTagAnalytics(state);

    dispatch({ type: ADD_EXCLUDE_TAG });
};

// ANALYTICS

const logSaveTagsAnalytics = (state) => {
    Analytics.logEventWithAppState('one_rm_select_exclude_tags', {
    }, state);
};

const logCancelEditTagsAnalytics = (state) => {
    Analytics.logEventWithAppState('one_rm_cancel_edit_exclude_tags', {
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
