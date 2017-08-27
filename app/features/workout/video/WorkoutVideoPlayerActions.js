import {
    DELETE_WORKOUT_VIDEO,
    DISMISS_WORKOUT_VIDEO_PLAYER
} from 'app/ActionTypes';

export const deleteVideo = (setID) => ({
    type: DELETE_WORKOUT_VIDEO,
    setID: setID
});

export const closeModal = () => ({
    type: DISMISS_WORKOUT_VIDEO_PLAYER
});
