import {
    ADD_INCLUDE_TAG,
    REMOVE_INCLUDE_TAG,
    SAVE_INCLUDES_TAGS,
    DISMISS_INCLUDES_TAGS,
} from 'app/ActionTypes';

export const saveTags = (tags = []) => ({
    type: SAVE_INCLUDES_TAGS,
    tags: tags,
});

export const cancelTags = () => ({
    type: DISMISS_INCLUDES_TAGS,
})

export const tappedPill = () => ({
    type: REMOVE_INCLUDE_TAG,
});

export const addPill = () => ({
    type: ADD_INCLUDE_TAG,
});
