import {
    DELETE_WORKOUT_VIDEO,
    DISMISS_WORKOUT_VIDEO_PLAYER
} from 'app/ActionTypes';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';
import * as Analytics from 'app/utility/Analytics';

export const deleteVideo = (setID) => (dispatch, getState) => {
    var state = getState();

    logDeleteVideoAnalytics(state);

    dispatch({
        type: DELETE_WORKOUT_VIDEO,
        setID: setID        
    });
};

export const closeModal = () => (dispatch, getState) => {
    var state = getState();

    logCancelWatchVideoAnalytics(state);    

    Analytics.setCurrentScreen('workout');
    
    dispatch({
        type: DISMISS_WORKOUT_VIDEO_PLAYER
    });
};

const logDeleteVideoAnalytics = (state) => {
    let startDate = DurationsSelectors.getWorkoutVideoPlayerStart(state);
    let duration = DurationsSelectors.getDurationBetween(startDate, new Date());  

    Analytics.logEventWithAppState('delete_video', {
        duration: duration
    }, state);        
}

const logCancelWatchVideoAnalytics = (state) => {
    let startDate = DurationsSelectors.getWorkoutVideoPlayerStart(state);
    let duration = DurationsSelectors.getDurationBetween(startDate, new Date());  

    Analytics.logEventWithAppState('cancel_watch_video', {
        duration: duration
    }, state);    
};