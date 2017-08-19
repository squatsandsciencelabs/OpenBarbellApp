import {
    DISMISS_HISTORY_TAGS,
    SAVE_HISTORY_SET_TAGS
} from 'app/ActionTypes';

export const dismissTags = () => ({
    type: DISMISS_HISTORY_TAGS
});

export const saveTags = (setID, tags = []) => ({
    type: SAVE_HISTORY_SET_TAGS,
    setID: setID,
    tags: tags
});
