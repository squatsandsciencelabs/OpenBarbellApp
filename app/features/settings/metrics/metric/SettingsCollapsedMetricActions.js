import {
    DISMISS_COLLAPSED_METRIC
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as CollapsedSettingsActionCreators from 'app/redux/shared_actions/CollapsedSettingsActionCreators';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as CollapsedSettingsSelectors from 'app/redux/selectors/CollapsedSettingsSelectors';

export const saveDefaultCollapsedMetricSetting = (metric) => (dispatch, getState) => {
    const state = getState();
    const prevMetric = CollapsedSettingsSelectors.getCurrentMetric(state);

    logChangeCollapsedMetricAnalytics(prevMetric, metric, state);

    dispatch(CollapsedSettingsActionCreators.saveCollapsedMetric(metric));
};

export const dismissCollapsedMetricSetter = () => {
    Analytics.setCurrentScreen('settings');
    
    return {
        type: DISMISS_COLLAPSED_METRIC,    
    };
};

// ANALYTICS

const logChangeCollapsedMetricAnalytics = (prevMetric, metric, state) => {
    Analytics.logEventWithAppState('change_collapsed_metric', {
        from_metric: prevMetric,
        to_metric: metric,
    }, state);
};
