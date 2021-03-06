import {
    DISMISS_DEFAULT_METRIC
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SettingsActionCreators from 'app/redux/shared_actions/SettingsActionCreators';

export const saveDefaultMetricSetting = (metric = 'kgs') => (dispatch, getState) => {
    const state = getState();
    
    logChangeDefaultMetricAnalytics(metric, state);

    dispatch(SettingsActionCreators.saveDefaultMetric(metric));
};

export const dismissDefaultMetricSetter = () => {
    Analytics.setCurrentScreen('settings');
    
    return {
        type: DISMISS_DEFAULT_METRIC,    
    };
};

// ANALYTICS

const logChangeDefaultMetricAnalytics = (metric, state) => {
    Analytics.logEventWithAppState('change_default_metric', {
        to_metric: metric,
    }, state);
};
