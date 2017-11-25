import {
    DISMISS_COLLAPSED_METRICS
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SettingsActionCreators from 'app/redux/shared_actions/SettingsActionCreators';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';

export const saveDefaultCollapsedMetricSetting = (metric = 'avg velocity') => (dispatch, getState) => {
    const state = getState();
    logChangeCollapsedMetricAnalytics(metric, state);

    dispatch(SettingsActionCreators.saveCollapsedMetric(metric));
};

export const dismissCollapsedMetricSetter = () => {
    Analytics.setCurrentScreen('settings');
    
    return {
        type: DISMISS_COLLAPSED_METRICS,    
    }
};

// ANALYTICS

const logChangeCollapsedMetricAnalytics = (metric, state) => {
    Analytics.logEventWithAppState('change_collapsed_metric', {
        to_metric: metric,
    }, state);
};
