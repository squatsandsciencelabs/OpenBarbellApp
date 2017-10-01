import {
    DELETE_WORKOUT_VIDEO,
    DISMISS_WORKOUT_VIDEO_PLAYER
} from 'app/ActionTypes';
import * as Analytics from 'app/utility/analytics/Analytics';

export const deleteVideo = (setID) => ({
    type: DELETE_WORKOUT_VIDEO,
    setID: setID
});

export const closeModal = () => {
    Analytics.setCurrentScreen('workout');
    
    return {
        type: DISMISS_WORKOUT_VIDEO_PLAYER
    }
};
