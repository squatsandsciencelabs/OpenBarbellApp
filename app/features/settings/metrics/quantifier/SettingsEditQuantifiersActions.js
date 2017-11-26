import {
    DISMISS_QUANTIFIER
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as CollapsedSettingsActionCreators from 'app/redux/shared_actions/CollapsedSettingsActionCreators';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as CollapsedSettingsSelectors from 'app/redux/selectors/CollapsedSettingsSelectors';

export const saveDefaultQuantifierSetting = (quantifier) => (dispatch, getState) => {
    const state = getState();
    
    const prevQuantifier = CollapsedSettingsSelectors.getCurrentQuantifier(state);
    logChangeQuantifierAnalytics(prevQuantifier, quantifier, state);

    dispatch(CollapsedSettingsActionCreators.saveQuantifier(quantifier));
};

export const dismissQuantifierSetter = () => {
    Analytics.setCurrentScreen('settings');
    
    return {
        type: DISMISS_QUANTIFIER,
    };
};

// ANALYTICS

const logChangeQuantifierAnalytics = (prevQuantifier, quantifier, state) => {
    Analytics.logEventWithAppState('change_quantifier', {
        from_quantifier: prevQuantifier,
        to_quantifier: quantifier,
    }, state);
};
