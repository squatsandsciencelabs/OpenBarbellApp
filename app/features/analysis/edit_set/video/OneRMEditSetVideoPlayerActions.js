import {
    DELETE_WORKOUT_VIDEO,
    DELETE_HISTORY_VIDEO,
    DISMISS_1RM_VIDEO_PLAYER,
} from 'app/configs+constants/ActionTypes';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as Analytics from 'app/services/Analytics';

export const deleteVideo = (setID) => (dispatch, getState) => {
    const state = getState();
    logDeleteVideoAnalytics(state, setID);

    if (SetsSelectors.getIsWorkoutSet(state, setID)) {
        dispatch({
            type: DELETE_WORKOUT_VIDEO,
            setID: setID,
        });
    } else {
        dispatch({
            type: DELETE_HISTORY_VIDEO,
            setID: setID,
        });
    }
};

export const closeModal = (setID) => (dispatch, getState) => {
    const state = getState();
    logCancelWatchVideoAnalytics(state, setID);
    Analytics.setCurrentScreen('one_rm_edit_set');
    
    dispatch({
        type: DISMISS_1RM_VIDEO_PLAYER
    });
};

const logDeleteVideoAnalytics = (state, setID) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('delete_video', {
        is_working_set: is_working_set,
        set_id: setID,
    }, state);
}

const logCancelWatchVideoAnalytics = (state, setID) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('cancel_watch_video', {
        is_working_set: is_working_set,
        set_id: setID,
    }, state);
};
