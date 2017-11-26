import {
    DISMISS_COLLAPSED_METRICS
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SettingsActionCreators from 'app/redux/shared_actions/SettingsActionCreators';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';

export const saveDefaultCollapsedMetricSetting = (metric = 'avg velocity') => (dispatch, getState) => {
    const state = getState();
    const metricType = SettingsSelectors.getCurrentMetricType(state);

    logChangeCollapsedMetricAnalytics(metric, metricType, state);

    dispatch(SettingsActionCreators.saveCollapsedMetric(metric));
};

export const dismissCollapsedMetricSetter = () => {
    Analytics.setCurrentScreen('settings');
    
    return {
        type: DISMISS_COLLAPSED_METRICS,    
    }
};

// ANALYTICS

const logChangeCollapsedMetricAnalytics = (metric, metricType, state) => {
    Analytics.logEventWithAppState('change_collapsed_metric', {
        metric: metricType,
        to_metric: metric,
    }, state);
};
