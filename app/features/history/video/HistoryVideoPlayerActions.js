import {
    DELETE_HISTORY_VIDEO,
    DISMISS_HISTORY_VIDEO_PLAYER
} from 'app/ActionTypes';

export const deleteVideo = (setID) => ({
    type: DELETE_HISTORY_VIDEO,
    setID: setID
});

export const closeModal = () => ({
    type: DISMISS_HISTORY_VIDEO_PLAYER
});
