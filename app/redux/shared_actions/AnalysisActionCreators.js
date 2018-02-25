import {
    Linking,
} from 'react-native';

import { 
    SAVE_1RM_EXERCISE,
    PRESENT_BEST_RESULTS,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const saveSelected1RMExercise = (exercise = 'Squat') => ({
    type: SAVE_1RM_EXERCISE,
    exercise: exercise,
});

export const presentBestResults = () => (dispatch, getState) => {
    const state = getState();
    logBestResultsAnalytics(state);
    
    Linking.openURL("http://www.squatsandscience.com/onerepmax/");
    dispatch({ type: PRESENT_BEST_RESULTS });
};

// ANALYTICS

const logBestResultsAnalytics = (state) => {
    Analytics.logEventWithAppState('one_rm_best_results', {
    }, state);
};
