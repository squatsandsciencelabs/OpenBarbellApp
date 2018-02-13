import {
    ADD_EXCLUDE_TAG,
    REMOVE_EXCLUDE_TAG,
    SAVE_EXCLUDES_TAGS,
    DISMISS_EXCLUDES_TAGS,
} from 'app/ActionTypes';

export const saveTags = (tags = []) => ({
    type: SAVE_EXCLUDES_TAGS,
    tags: tags,
});

export const cancelTags = () => ({
    type: DISMISS_EXCLUDES_TAGS,
})

export const tappedPill = () => ({
    type: REMOVE_EXCLUDE_TAG,
});

export const addPill = () => ({
    type: ADD_EXCLUDE_TAG,
});
