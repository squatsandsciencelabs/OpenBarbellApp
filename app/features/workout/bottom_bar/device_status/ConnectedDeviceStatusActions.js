import * as AppStateActionCreators from 'app/redux/shared_actions/AppStateActionCreators';
import * as Analytics from 'app/services/Analytics';

export const tappedDevice = () => (dispatch, getState) => {
    const state = getState();
    logWorkoutDeviceAnalytics(state);

    dispatch(AppStateActionCreators.changeTab(3));
};

// ANALYTICS

const logWorkoutDeviceAnalytics = (state) => {
    Analytics.logEventWithAppState('workout_device', {
    }, state);
};
