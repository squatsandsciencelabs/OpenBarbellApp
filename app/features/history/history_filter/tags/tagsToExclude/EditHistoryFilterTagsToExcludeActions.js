import {
    ADD_HISTORY_FILTER_EXCLUDE_TAG,
    REMOVE_HISTORY_FILTER_EXCLUDE_TAG,
    SAVE_HISTORY_FILTER_EXCLUDES_TAGS,
    DISMISS_HISTORY_FILTER_EXCLUDES_TAGS,
} from 'app/configs+constants/ActionTypes';

export const saveTags = (tags = []) => ({
    type: SAVE_HISTORY_FILTER_EXCLUDES_TAGS,
    tags: tags,
});

export const dismissTags = () => ({ type: DISMISS_HISTORY_FILTER_EXCLUDES_TAGS });

export const cancelTags = () => ({ type: DISMISS_HISTORY_FILTER_EXCLUDES_TAGS });;

export const tappedPill = () => ({ type: REMOVE_HISTORY_FILTER_EXCLUDE_TAG });

export const addPill = () => ({ type: ADD_HISTORY_FILTER_EXCLUDE_TAG });
