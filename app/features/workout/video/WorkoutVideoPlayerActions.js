import {
    DELETE_WORKOUT_VIDEO,
    DISMISS_WORKOUT_VIDEO_PLAYER
} from 'app/ActionTypes';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as Analytics from 'app/services/Analytics';

export const deleteVideo = (setID) => (dispatch, getState) => {
    const state = getState();
    logDeleteVideoAnalytics(setID, state);

    dispatch({
        type: DELETE_WORKOUT_VIDEO,
        setID: setID        
    });
};

export const closeModal = (setID) => (dispatch, getState) => {
    const state = getState();
    logCancelWatchVideoAnalytics(setID, state);
    Analytics.setCurrentScreen('workout');
    
    dispatch({
        type: DISMISS_WORKOUT_VIDEO_PLAYER
    });
};

const logDeleteVideoAnalytics = (setID, state) => {
    const duration = DurationsSelectors.getWorkoutVideoPlayerDuration(state);
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('delete_video', {
        duration: duration,
        is_working_set: is_working_set,
    }, state);        
}

const logCancelWatchVideoAnalytics = (setID, state) => {
    const duration = DurationsSelectors.getWorkoutVideoPlayerDuration(state);
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('cancel_watch_video', {
        duration: duration,
        is_working_set: is_working_set,
    }, state);    
};
