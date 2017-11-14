import {
    EXPAND_HISTORY_SET,
    PRESENT_HISTORY_VIDEO_PLAYER,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const expandCard = (setID) => (dispatch, getState) => {
    // TODO: analytics

    dispatch({
        type: EXPAND_HISTORY_SET,
        setID: setID,
    });
};

export const presentWatchVideo = (setID, videoFileURL) => (dispatch, getState) => {
    const state = getState();
    Analytics.setCurrentScreen('history_watch_video');
    logWatchVideoAnalytics(setID, state);
    
    dispatch({
        type: PRESENT_HISTORY_VIDEO_PLAYER,
        setID: setID,
        videoFileURL: videoFileURL
    });
};

const logWatchVideoAnalytics = (setID, state) => {
    Analytics.logEventWithAppState('watch_video', {
        is_working_set: false
    }, state);
};
