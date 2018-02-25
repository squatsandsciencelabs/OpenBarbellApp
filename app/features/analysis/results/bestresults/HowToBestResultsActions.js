import {
    Linking,
} from 'react-native';

import {
    PRESENT_BEST_RESULTS,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const presentBestResults = () => (dispatch, getState) => {
    // TODO: analytics
    const state = getState();
    logBestResultsAnalytics(state);
    Linking.openURL("http://www.squatsandscience.com/onerepmax/");
    dispatch({ type: PRESENT_BEST_RESULTS });
};

const logBestResultsAnalytics = (state) => {
    Analytics.logEventWithAppState('one_rm_best_results', {
    }, state);
};
