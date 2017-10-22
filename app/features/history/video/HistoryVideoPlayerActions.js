import {
    DELETE_HISTORY_VIDEO,
    DISMISS_HISTORY_VIDEO_PLAYER
} from 'app/ActionTypes';
import * as Analytics from 'app/utility/Analytics';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';
import * as DurationCalculator from 'app/utility/transforms/DurationCalculator';

export const deleteVideo = (setID) => (dispatch, getState) => {
    var state = getState();

    deleteVideoAnalytics(state);

    dispatch({
        type: DELETE_HISTORY_VIDEO,
        setID: setID        
    });
};

export const closeModal = () => (dispatch, getState) => {
    var state = getState();

    cancelWatchVideoAnalytics(state);    

    Analytics.setCurrentScreen('history');
    
    dispatch({
        type: DISMISS_HISTORY_VIDEO_PLAYER
    });
};

const deleteVideoAnalytics = (state) => {
    let startDate = DurationsSelectors.getHistoryVideoPlayerStart(state);
    let duration = DurationCalculator.getDurationTime(startDate, new Date());  

    Analytics.logEventWithAppState('delete_video', {
        duration: duration
    }, state);        
}

const cancelWatchVideoAnalytics = (state) => {
    let startDate = DurationsSelectors.getHistoryVideoPlayerStart(state);
    let duration = DurationCalculator.getDurationTime(startDate, new Date());  

    Analytics.logEventWithAppState('cancel_watch_video', {
        duration: duration
    }, state);    
};
