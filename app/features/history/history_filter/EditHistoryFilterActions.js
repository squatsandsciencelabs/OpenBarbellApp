import { Alert } from 'react-native';

import {
    PRESENT_HISTORY_FILTER_EXERCISE,
    PRESENT_HISTORY_FILTER_START_DATE,
    PRESENT_HISTORY_FILTER_END_DATE,
    PRESENT_HISTORY_FILTER_INCLUDES_TAGS,
    PRESENT_HISTORY_FILTER_EXCLUDES_TAGS,
    DISMISS_HISTORY_FILTER,
    SAVE_HISTORY_FILTER_START_RPE,
    SAVE_HISTORY_FILTER_END_RPE,
    SAVE_HISTORY_FILTER_STARTING_REP_RANGE,
    SAVE_HISTORY_FILTER_ENDING_REP_RANGE,
    SAVE_HISTORY_FILTER_START_WEIGHT,
    SAVE_HISTORY_FILTER_END_WEIGHT,
    CLEAR_HISTORY_FILTER,
    SAVE_HISTORY_FILTER,
    TOGGLE_START_WEIGHT_METRIC,
    TOGGLE_END_WEIGHT_METRIC,
    TOGGLE_SHOW_REMOVED,
    CLEAR_HISTORY_FILTER_START_DATE,
    CLEAR_HISTORY_FILTER_END_DATE,
} from 'app/configs+constants/ActionTypes';
import * as HistorySelectors from 'app/redux/selectors/HistorySelectors';
import * as WeightConversion from 'app/utility/WeightConversion';
import * as Analytics from 'app/services/Analytics';

export const presentSelectExercise = () => ({ 
    type: PRESENT_HISTORY_FILTER_EXERCISE,
});

export const dismissHistoryFilter = () => {
    Analytics.setCurrentScreen('history');

    return {
        type: DISMISS_HISTORY_FILTER,
    };
};

export const presentTagsToInclude = () => ({ 
    type: PRESENT_HISTORY_FILTER_INCLUDES_TAGS, 
});

export const presentTagsToExclude = () => ({ 
    type: PRESENT_HISTORY_FILTER_EXCLUDES_TAGS,
});

export const presentStartDate = () => ({
    type: PRESENT_HISTORY_FILTER_START_DATE,
});

export const presentEndDate = () => ({
    type: PRESENT_HISTORY_FILTER_END_DATE,
});

export const updateStartWeight = (weight) => ({
    type: SAVE_HISTORY_FILTER_START_WEIGHT,
    startWeight: weight,
});

export const updateEndWeight = (weight) => ({
    type: SAVE_HISTORY_FILTER_END_WEIGHT,
    endWeight: weight,
});

export const updateStartRPE = (rpe) => ({
    type: SAVE_HISTORY_FILTER_START_RPE,
    rpe: rpe,
});

export const updateEndRPE = (rpe) => ({
    type: SAVE_HISTORY_FILTER_END_RPE,
    rpe: rpe,
});

export const updateStartingRepRange = (reps) => ({
    type: SAVE_HISTORY_FILTER_STARTING_REP_RANGE,
    startingRepRange: reps,
});

export const updateEndingRepRange = (reps) => ({
    type: SAVE_HISTORY_FILTER_ENDING_REP_RANGE,
    endingRepRange: reps,
});

export const clearHistoryFilter = () => ({
    type: CLEAR_HISTORY_FILTER,
});

export const saveHistoryFilter = () => (dispatch, getState) => {
    const state = getState();

    // TODO: Consider putting some of this logic into utils

    // weight
    const startWeight = HistorySelectors.getEditingHistoryFilterStartingWeight(state);
    const startWeightMetric = HistorySelectors.getEditingHistoryFilterStartingWeightMetric(state);
    const startLbs = WeightConversion.weightInLBs(startWeightMetric, startWeight);
    const endWeight = HistorySelectors.getEditingHistoryFilterEndingWeight(state);
    const endWeightMetric = HistorySelectors.getEditingHistoryFilterEndingWeightMetric(state);
    const endLbs = WeightConversion.weightInLBs(endWeightMetric, endWeight);

    // rpe
    const startingRPE = HistorySelectors.getEditingHistoryFilterStartingRPE(state);
    const startingRPEWithoutCommas = startingRPE ? Number(startingRPE.toString().replace(',','.')) : startingRPE;
    const endingRPE = HistorySelectors.getEditingHistoryFilterEndingRPE(state);
    const endingRPEWithoutCommas = endingRPE ? Number(endingRPE.toString().replace(',','.')) : endingRPE;

    // reps
    const startingReps = HistorySelectors.getEditingHistoryFilterStartingRepRange(state);
    const endingReps = HistorySelectors.getEditingHistoryFilterEndingRepRange(state);

    if (startLbs && endLbs && startLbs > endLbs) {
        Alert.alert("Invalid Weight Range", "Please enter a minimum weight that is less than your maximum weight.");
    } else if (startingRPEWithoutCommas && endingRPEWithoutCommas && startingRPEWithoutCommas > endingRPEWithoutCommas) {
        Alert.alert("Invalid RPE Range", "Please enter a minimum RPE that is less than your maximum RPE.");
    } else if (startingReps && endingReps && startingReps > endingReps) {
        Alert.alert("Invalid Rep Range", "Please enter a minimum number of reps that is less than your maximum number of reps.");
    } else {
        Analytics.setCurrentScreen('history');
        Analytics.logEventWithAppState('apply_filters', {
        }, state);
    
        dispatch({
            type: SAVE_HISTORY_FILTER,
        });
    }
};

export const toggleStartWeightMetric = () => ({
    type: TOGGLE_START_WEIGHT_METRIC,
});

export const toggleEndWeightMetric = () => ({
    type: TOGGLE_END_WEIGHT_METRIC,
});

export const toggleShowRemoved = () => ({
    type: TOGGLE_SHOW_REMOVED,
})

export const clearStartDate = () => ({
    type: CLEAR_HISTORY_FILTER_START_DATE,
});

export const clearEndDate = () => ({
    type: CLEAR_HISTORY_FILTER_END_DATE,
});
