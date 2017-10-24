import {
    DELETE_HISTORY_VIDEO,
    DISMISS_HISTORY_VIDEO_PLAYER
} from 'app/ActionTypes';
import * as Analytics from 'app/utility/Analytics';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';

export const deleteVideo = (setID) => (dispatch, getState) => {
    var state = getState();

    logDeleteVideoAnalytics(state);

    dispatch({
        type: DELETE_HISTORY_VIDEO,
        setID: setID        
    });
};

export const closeModal = () => (dispatch, getState) => {
    var state = getState();

    logCancelWatchVideoAnalytics(state);    

    Analytics.setCurrentScreen('history');
    
    dispatch({
        type: DISMISS_HISTORY_VIDEO_PLAYER
    });
};

const logDeleteVideoAnalytics = (state) => {
    let startDate = DurationsSelectors.getHistoryVideoPlayerStart(state);
    let duration = DurationsSelectors.getDurationBetween(startDate, new Date());  

    Analytics.logEventWithAppState('delete_video', {
        duration: duration
    }, state);        
}

const logCancelWatchVideoAnalytics = (state) => {
    let startDate = DurationsSelectors.getHistoryVideoPlayerStart(state);
    let duration = DurationsSelectors.getDurationBetween(startDate, new Date());  

    Analytics.logEventWithAppState('cancel_watch_video', {
        duration: duration
    }, state);    
};
