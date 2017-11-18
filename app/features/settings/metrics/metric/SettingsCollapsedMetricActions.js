import {
    DISMISS_COLLAPSED_METRICS
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SettingsActionCreators from 'app/redux/shared_actions/SettingsActionCreators';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';

export const saveDefaulCollapsedMetricSetting = (position = 'metric1', metric = 'avg velocity') => (dispatch, getState) => {
    const state = getState();
    // logChangeDefaultMetricAnalytics(metric, state);

    dispatch(SettingsActionCreators.saveCollapsedMetric(position, metric));
};

export const dismissCollapsedMetricSetter = () => {
    Analytics.setCurrentScreen('settings');
    
    return {
        type: DISMISS_COLLAPSED_METRICS,    
    }
};

// ANALYTICS

// const logChangeDefaultMetricAnalytics = (metric, state) => {
//     Analytics.logEventWithAppState('change_default_metric', {
//         to_metric: metric,
//     }, state);
// };
