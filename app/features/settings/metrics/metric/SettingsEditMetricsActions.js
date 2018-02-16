import {
    DISMISS_COLLAPSED_METRIC
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as CollapsedSettingsActionCreators from 'app/redux/shared_actions/CollapsedSettingsActionCreators';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as CollapsedSettingsSelectors from 'app/redux/selectors/CollapsedSettingsSelectors';

export const saveCollapsedMetricSetting = (metric) => (dispatch, getState) => {
    const state = getState();
    const prevMetric = CollapsedSettingsSelectors.getCurrentMetric(state);
    const rank = CollapsedSettingsSelectors.getCurrentCollapsedMetricRank(state);
    logChangeCollapsedMetricAnalytics(rank, prevMetric, metric, state);

    dispatch(CollapsedSettingsActionCreators.saveCollapsedMetric(metric));
};

export const saveCollapsedMetricSetting1 = (metric) => (dispatch, getState) => {
    const state = getState();
    const prevMetric = CollapsedSettingsSelectors.getMetric1(state);
    logChangeCollapsedMetricAnalytics(1, prevMetric, metric, state);

    dispatch(CollapsedSettingsActionCreators.saveCollapsedMetric1(metric));
};

export const saveCollapsedMetricSetting2 = (metric) => (dispatch, getState) => {
    const state = getState();
    const prevMetric = CollapsedSettingsSelectors.getMetric2(state);
    logChangeCollapsedMetricAnalytics(2, prevMetric, metric, state);

    dispatch(CollapsedSettingsActionCreators.saveCollapsedMetric2(metric));
};

export const saveCollapsedMetricSetting3 = (metric) => (dispatch, getState) => {
    const state = getState();
    const prevMetric = CollapsedSettingsSelectors.getMetric3(state);
    logChangeCollapsedMetricAnalytics(3, prevMetric, metric, state);

    dispatch(CollapsedSettingsActionCreators.saveCollapsedMetric3(metric));
};

export const saveCollapsedMetricSetting4 = (metric) => (dispatch, getState) => {
    const state = getState();
    const prevMetric = CollapsedSettingsSelectors.getMetric4(state);
    logChangeCollapsedMetricAnalytics(4, prevMetric, metric, state);

    dispatch(CollapsedSettingsActionCreators.saveCollapsedMetric4(metric));
};

export const saveCollapsedMetricSetting5 = (metric) => (dispatch, getState) => {
    const state = getState();
    const prevMetric = CollapsedSettingsSelectors.getMetric5(state);
    logChangeCollapsedMetricAnalytics(5, prevMetric, metric, state);

    dispatch(CollapsedSettingsActionCreators.saveCollapsedMetric5(metric));
};

export const dismissCollapsedMetricSetter = () => {
    Analytics.setCurrentScreen('settings');
    
    return {
        type: DISMISS_COLLAPSED_METRIC,    
    };
};

// ANALYTICS

const logChangeCollapsedMetricAnalytics = (rank, prevMetric, metric, state) => {
    Analytics.logEventWithAppState('change_collapsed_metric', {
        rank: rank,
        from_metric: prevMetric,
        to_metric: metric,
    }, state);
};
