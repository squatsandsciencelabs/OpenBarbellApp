import {
    DISMISS_HISTORY_TAGS,
    SAVE_HISTORY_SET_TAGS
} from 'app/ActionTypes';
import * as Analytics from 'app/utility/Analytics';

export const dismissTags = () => {
    Analytics.setCurrentScreen('history');
    
    return {
        type: DISMISS_HISTORY_TAGS
    }
};

export const saveTags = (setID, tags = []) => ({
    type: SAVE_HISTORY_SET_TAGS,
    setID: setID,
    tags: tags
});
