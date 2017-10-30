import {
    Linking
} from 'react-native';

import {
    FEEDBACK,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const presentFeedback = () => (dispatch, getState) => {
    // TODO: move this to config
    Linking.openURL('mailto:contact@squatsandscience.com?subject=A%20really%20nice%20comment%20from%20an%20app%20user&body=');

    const state = getState();
    logFeedbackAnalytics(state);

    dispatch({
        type: FEEDBACK
    });
};

const logFeedbackAnalytics = (state) => {
    Analytics.logEventWithAppState('feedback', {
    }, state);
};
