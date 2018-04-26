import {
    ADD_HISTORY_FILTER_INCLUDE_TAG,
    REMOVE_HISTORY_FILTER_INCLUDE_TAG,
    SAVE_HISTORY_FILTER_INCLUDES_TAGS,
    DISMISS_HISTORY_FILTER_INCLUDES_TAGS,
} from 'app/configs+constants/ActionTypes';

export const saveTags = (tags = []) => ({
    type: SAVE_HISTORY_FILTER_INCLUDES_TAGS,
    tags: tags,
});

export const dismissTags = () => ({ type: DISMISS_HISTORY_FILTER_INCLUDES_TAGS });

export const cancelTags = () => ({ type: DISMISS_HISTORY_FILTER_INCLUDES_TAGS });;

export const tappedPill = () => ({ type: REMOVE_HISTORY_FILTER_INCLUDE_TAG });

export const addPill = () => ({ type: ADD_HISTORY_FILTER_INCLUDE_TAG });
