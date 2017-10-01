import {
    DELETE_HISTORY_VIDEO,
    DISMISS_HISTORY_VIDEO_PLAYER
} from 'app/ActionTypes';
import * as Analytics from 'app/utility/analytics/Analytics';

export const deleteVideo = (setID) => ({
    type: DELETE_HISTORY_VIDEO,
    setID: setID
});

export const closeModal = () => {
    Analytics.setCurrentScreen('history');
    
    return {
        type: DISMISS_HISTORY_VIDEO_PLAYER
    }
};
