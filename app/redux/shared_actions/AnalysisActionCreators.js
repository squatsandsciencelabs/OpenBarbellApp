import {
    Linking,
} from 'react-native';

import { 
    SAVE_1RM_EXERCISE,
    PRESENT_ALGORITHM,
    PRESENT_BEST_RESULTS,
    ANALYSIS_DRAGGED,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const saveSelected1RMExercise = (exercise = 'Squat') => ({
    type: SAVE_1RM_EXERCISE,
    exercise: exercise,
});

export const presentAlgorithm = () => (dispatch, getState) => {
    const state = getState();
    logAlgorithmAnalytics(state);
    
    Linking.openURL("http://squatsandscience.com/1rmalgorithm/");
    dispatch({ type: PRESENT_ALGORITHM });
};

export const presentBestResults = () => (dispatch, getState) => {
    const state = getState();
    logBestResultsAnalytics(state);
    
    Linking.openURL("http://squatsandscience.com/1rmbestresults/");
    dispatch({ type: PRESENT_BEST_RESULTS });
};

export const analysisDragged = () => ({
    type: ANALYSIS_DRAGGED,
});

// ANALYTICS

const logAlgorithmAnalytics = (state) => {
    Analytics.logEventWithAppState('one_rm_about_algorithm', {
    }, state);
};

const logBestResultsAnalytics = (state) => {
    Analytics.logEventWithAppState('one_rm_best_results', {
    }, state);
};
