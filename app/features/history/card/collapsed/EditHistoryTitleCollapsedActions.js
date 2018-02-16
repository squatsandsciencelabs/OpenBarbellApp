import {
    EXPAND_HISTORY_SET,
    PRESENT_HISTORY_VIDEO_PLAYER,
} from 'app/configs+constants/ActionTypes';
import * as VideoPermissionsUtils from 'app/utility/VideoPermissionsUtils';
import * as Analytics from 'app/services/Analytics';
import * as CollapseExpandHistoryActions from 'app/redux/shared_actions/CollapseExpandHistoryActions';

export const expandCard = (setID) => (dispatch, getState) => {
    const state = getState();
    logExpandCardAnalytics(setID, state);

    dispatch(CollapseExpandHistoryActions.expandCard(setID));
};

export const presentWatchVideo = (setID, videoFileURL) => (dispatch, getState) => {
    VideoPermissionsUtils.checkWatchVideoPermissions().then(() => {        
        const state = getState();
        Analytics.setCurrentScreen('history_watch_video');
        logWatchVideoAnalytics(setID, state);
        
        dispatch({
            type: PRESENT_HISTORY_VIDEO_PLAYER,
            setID: setID,
            videoFileURL: videoFileURL
        });
    }).catch(() => {});
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
