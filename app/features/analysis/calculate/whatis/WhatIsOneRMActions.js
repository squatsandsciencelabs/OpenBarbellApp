import {
    DISMISS_INFO_MODAL,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as AnalysisActionCreators from 'app/redux/shared_actions/AnalysisActionCreators';

export const presentBestResults = () => AnalysisActionCreators.presentBestResults();

export const dismissInfoModal = () => (dispatch, getState) => {
    const state = getState();
    logDismissInfoAnalytics(state);
    Analytics.setCurrentScreen('analysis');

    dispatch({ type: DISMISS_INFO_MODAL });
};

// ANALYTICS

const logDismissInfoAnalytics = (state) => {
    Analytics.logEventWithAppState('one_rm_close_info', {
    }, state);
};
