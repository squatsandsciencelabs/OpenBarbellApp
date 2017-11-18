import {
    DISMISS_QUANTIFIER
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SettingsActionCreators from 'app/redux/shared_actions/SettingsActionCreators';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';

export const saveDefaulQuantifierSetting = (position = 'quantifier1', quantifier = 'Last Set') => (dispatch, getState) => {
    const state = getState();
    // logChangeDefaultMetricAnalytics(metric, state);

    dispatch(SettingsActionCreators.saveQuantifier(position, quantifier));
};

export const dismissQuantifierSetter = () => {
    Analytics.setCurrentScreen('settings');
    
    return {
        type: DISMISS_QUANTIFIER,    
    }
};

// ANALYTICS

// const logChangeDefaultMetricAnalytics = (metric, state) => {
//     Analytics.logEventWithAppState('change_default_metric', {
//         to_metric: metric,
//     }, state);
// };
