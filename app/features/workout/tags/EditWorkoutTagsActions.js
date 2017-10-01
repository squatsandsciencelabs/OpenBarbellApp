import {
    DISMISS_WORKOUT_TAGS,
    SAVE_WORKOUT_SET_TAGS
} from 'app/ActionTypes';
import * as Analytics from 'app/utility/analytics/Analytics';

export const dismissTags = () => {
    Analytics.setCurrentScreen('workout');
    
    return {
        type: DISMISS_WORKOUT_TAGS
    }
};

export const saveTags = (setID, tags = []) => ({
    type: SAVE_WORKOUT_SET_TAGS,
    setID: setID,
    tags: tags
});
