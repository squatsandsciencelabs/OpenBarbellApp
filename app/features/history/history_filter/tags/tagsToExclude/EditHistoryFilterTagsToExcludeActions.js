import {
    ADD_HISTORY_FILTER_EXCLUDE_TAG,
    REMOVE_HISTORY_FILTER_EXCLUDE_TAG,
    SAVE_HISTORY_FILTER_EXCLUDES_TAGS,
    DISMISS_HISTORY_FILTER_EXCLUDES_TAGS,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const saveTags = (tags = []) => ({
    type: SAVE_HISTORY_FILTER_EXCLUDES_TAGS,
    tags: tags,
});

export const dismissTags = () => ({ type: DISMISS_HISTORY_FILTER_EXCLUDES_TAGS });

export const cancelTags = () => ({ type: DISMISS_HISTORY_FILTER_EXCLUDES_TAGS });;

export const tappedPill = () => ({ type: REMOVE_HISTORY_FILTER_EXCLUDE_TAG });

export const addPill = () => ({ type: ADD_HISTORY_FILTER_EXCLUDE_TAG });

// ANALYTICS 
// TODO: Add analytics for history filter tags

// const logSaveTagsAnalytics = (state) => {
//     Analytics.logEventWithAppState('one_rm_select_exclude_tags', {
//     }, state);
// };

// const logCancelEditTagsAnalytics = (state) => {
//     Analytics.logEventWithAppState('one_rm_cancel_edit_exclude_tags', {
//     }, state);
// };

// const logRemovedTagAnalytics = (state) => {
//     Analytics.logEventWithAppState('remove_tag', {
//     }, state);
// };

// const logAddTagAnalytics = (state) => {
//     Analytics.logEventWithAppState('one_rm_add_tag', {
//     }, state);
// };
