import {
    DISMISS_QUANTIFIERS
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SettingsActionCreators from 'app/redux/shared_actions/SettingsActionCreators';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';

export const saveDefaulQuantifierSetting = (quantifier = 'Last Rep') => (dispatch, getState) => {
    const state = getState();
    const quantifierType = SettingsSelectors.getCurrentQuantifierType(state);

    logChangeQuantifierAnalytics(quantifier, quantifierType, state);

    dispatch(SettingsActionCreators.saveQuantifier(quantifier));
};

export const dismissQuantifierSetter = () => {
    Analytics.setCurrentScreen('settings');
    
    return {
        type: DISMISS_QUANTIFIERS,    
    }
};

// ANALYTICS

const logChangeQuantifierAnalytics = (quantifier, quantifierType, state) => {
    Analytics.logEventWithAppState('change_quantifier', {
        quantifier: quantiferType,
        to_quantifier: quantifier,
    }, state);
};
