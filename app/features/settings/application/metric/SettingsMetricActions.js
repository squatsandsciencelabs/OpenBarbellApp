import {
<<<<<<< HEAD
    DISMISS_DEFAULT_METRIC
=======
    DISMISS_SET_METRIC
>>>>>>> default metric is set and updates for all sets
} from 'app/ActionTypes';

import * as SettingsActionCreators from 'app/redux/shared_actions/SettingsActionCreators';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';

export const saveDefaultMetricSetting = (metric = 'kgs') => {
<<<<<<< HEAD
    return SettingsActionCreators.saveDefaultMetric(metric);
};

export const dismissDefaultMetricSetter = () => ({
    type: DISMISS_DEFAULT_METRIC,    
=======
    return SettingsActionCreators.setDefaultMetric(metric);
};

export const dismissDefaultMetricSetter = () => ({
    type: DISMISS_SET_METRIC,    
>>>>>>> default metric is set and updates for all sets
});
