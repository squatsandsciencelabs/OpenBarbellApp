import {
    DISMISS_WORKOUT_TAGS,
    SAVE_WORKOUT_SET_TAGS
} from 'app/ActionTypes';

export const dismissTags = () => ({
    type: DISMISS_WORKOUT_TAGS
});

export const saveTags = (setID, tags = []) => ({
    type: SAVE_WORKOUT_SET_TAGS,
    setID: setID,
    tags: tags
});
