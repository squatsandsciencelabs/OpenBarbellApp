import {
    EXPAND_HISTORY_SET,
    PRESENT_HISTORY_VIDEO_PLAYER,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const expandCard = (setID) => (dispatch, getState) => {
    const state = getState();
    logExpandCardAnalytics(setID, state);

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
        is_working_set: false,
        from_collapsed_card: true,
    }, state);
};

const logExpandCardAnalytics = (setID, state) => {
    Analytics.logEventWithAppState('expand_card', {
        set_id: setID
    }, state);
};
