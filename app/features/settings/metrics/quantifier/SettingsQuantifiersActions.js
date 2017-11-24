import {
    DISMISS_QUANTIFIERS
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SettingsActionCreators from 'app/redux/shared_actions/SettingsActionCreators';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';

export const saveDefaulQuantifierSetting = (quantifier = 'Last Rep') => (dispatch, getState) => {
    const state = getState();
    // logChangeDefaultMetricAnalytics(metric, state);

    dispatch(SettingsActionCreators.saveQuantifier(quantifier));
};

export const dismissQuantifierSetter = () => {
    Analytics.setCurrentScreen('settings');
    
    return {
        type: DISMISS_QUANTIFIERS,    
    }
};

// ANALYTICS

// const logChangeDefaultMetricAnalytics = (metric, state) => {
//     Analytics.logEventWithAppState('change_default_metric', {
//         to_metric: metric,
//     }, state);
// };
