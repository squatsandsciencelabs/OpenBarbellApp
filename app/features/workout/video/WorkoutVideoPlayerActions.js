import {
    DELETE_WORKOUT_VIDEO,
    DISMISS_WORKOUT_VIDEO_PLAYER
} from 'app/ActionTypes';
import * as Analytics from 'app/utility/Analytics';

export const deleteVideo = (setID) => (dispatch, getState) => {
    var state = getState();

    deleteVideoAnalytics(state);

    return {
        type: DELETE_WORKOUT_VIDEO,
        setID: setID        
    }
};

export const closeModal = () => (dispatch, getState) => {
    var state = getState();

    cancelWatchVideoAnalytics(state);    

    Analytics.setCurrentScreen('workout');
    
    return {
        type: DISMISS_WORKOUT_VIDEO_PLAYER
    }
};

const deleteVideoAnalytics = (state) => {
    // let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);
    let startDate = DurationsSelectors.getWorkoutVideoPlayerStart(state);
    let duration = DurationCalculator.getDurationTime(startDate, new Date());  

    Analytics.logEventWithAppState('delete_video', {
        duration: duration
        // is_working_set: is_working_set
    }, state);        
}

const cancelWatchVideoAnalytics = (state) => {
    // let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);
    let startDate = DurationsSelectors.getWorkoutVideoPlayerStart(state);
    let duration = DurationCalculator.getDurationTime(startDate, new Date());  

    Analytics.logEventWithAppState('cancel_watch_video', {
        duration: duration
        // is_working_set: is_working_set
    }, state);    
};