import {
    DELETE_HISTORY_VIDEO,
    DISMISS_HISTORY_VIDEO_PLAYER
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';

export const deleteVideo = (setID) => (dispatch, getState) => {
    const state = getState();
    logDeleteVideoAnalytics(state);

    dispatch({
        type: DELETE_HISTORY_VIDEO,
        setID: setID        
    });
};

export const closeModal = (setID) => (dispatch, getState) => {
    const state = getState();
    logCancelWatchVideoAnalytics(state);
    Analytics.setCurrentScreen('history');
    
    dispatch({
        type: DISMISS_HISTORY_VIDEO_PLAYER
    });
};

const logDeleteVideoAnalytics = (state) => {
    const duration = DurationsSelectors.getHistoryVideoPlayerDuration(state);

    Analytics.logEventWithAppState('delete_video', {
        duration: duration,
        is_working_set: false,
    }, state);        
}

const logCancelWatchVideoAnalytics = (state) => {
    let duration = DurationsSelectors.getHistoryVideoPlayerDuration(state);

    Analytics.logEventWithAppState('cancel_watch_video', {
        duration: duration,
        is_working_set: false,
    }, state);    
};
