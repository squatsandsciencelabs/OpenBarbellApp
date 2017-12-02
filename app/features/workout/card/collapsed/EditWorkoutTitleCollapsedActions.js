import {
    EXPAND_WORKOUT_SET,
    PRESENT_WORKOUT_VIDEO_PLAYER,
} from 'app/ActionTypes';
import * as VideoPermissionsUtils from 'app/utility/VideoPermissionsUtils';
import * as Analytics from 'app/services/Analytics';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as CollapseExpandWorkoutActions from 'app/redux/shared_actions/CollapseExpandWorkoutActions';

export const expandCard = (setID) => (dispatch, getState) => {
    const state = getState();
    logExpandCardAnalytics(setID, state);

    dispatch(CollapseExpandWorkoutActions.expandCard(setID));
};

export const presentWatchVideo = (setID, videoFileURL) => (dispatch, getState) => {
    VideoPermissionsUtils.checkWatchVideoPermissions().then(() => {
        const state = getState();
        Analytics.setCurrentScreen('workout_watch_video');
        logWatchVideoAnalytics(setID, state);
        
        dispatch({
            type: PRESENT_WORKOUT_VIDEO_PLAYER,
            setID: setID,
            videoFileURL: videoFileURL
        });
    }).catch(() => {});
};

const logWatchVideoAnalytics = (setID, state) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);
    
    Analytics.logEventWithAppState('watch_video', {
        is_working_set: is_working_set,
        from_collapsed_card: true,
    }, state);
};

const logExpandCardAnalytics = (setID, state) => {
    Analytics.logEventWithAppState('expand_card', {
        set_id: setID
    }, state);
};
