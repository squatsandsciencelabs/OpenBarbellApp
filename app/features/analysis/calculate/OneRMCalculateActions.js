import {
    PRESENT_SELECT_EXERCISE,
    CHANGE_VELOCITY_SLIDER,
    CHANGE_1RM_DAYS_RANGE,
    PRESENT_INCLUDES_TAGS,
    PRESENT_EXCLUDES_TAGS,
    CALC_1RM,
    PRESENT_INFO_MODAL,
} from 'app/configs+constants/ActionTypes';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as OneRMCalculator from 'app/math/OneRMCalculator';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';
import * as Analytics from 'app/services/Analytics';

export const presentSelectExercise = () => (dispatch, getState) => {
    const state = getState();
    logEditExerciseAnalytics(state);
    Analytics.setCurrentScreen('one_rm_exercise_name');

    dispatch({ type: PRESENT_SELECT_EXERCISE });
};

export const changeVelocitySlider = (velocity) => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: CHANGE_VELOCITY_SLIDER,
        velocity: velocity,
    });
};

export const changeE1RMDays = (days) => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: CHANGE_1RM_DAYS_RANGE,
        days: Math.abs(days),
    });
};

export const presentTagsToExclude = () => (dispatch, getState) => {
    const state = getState();
    logEditExcludeTagsAnalytics(state);
    Analytics.setCurrentScreen('one_rm_exclude_tags');

    dispatch({ type: PRESENT_EXCLUDES_TAGS });
};

export const presentTagsToInclude = () => (dispatch, getState) => {
    const state = getState();
    logEditIncludeTagsAnalytics(state);
    Analytics.setCurrentScreen('one_rm_include_tags');

    dispatch({ type: PRESENT_INCLUDES_TAGS });
};

// TODO: consider passing in variables rather than pulling them from the store here
// going with pulling for now for simplicity
export const calcE1RM = () => (dispatch, getState) => {
    // get values
    const state = getState();
    const exercise = AnalysisSelectors.getExercise(state);
    const tagsToInclude = AnalysisSelectors.getTagsToInclude(state);
    const tagsToExclude = AnalysisSelectors.getTagsToExclude(state);
    const daysRange = AnalysisSelectors.getDaysRange(state);
    const velocity = AnalysisSelectors.getVelocitySlider(state);
    const allSets = SetsSelectors.getAllSets(state);
    const metric = SettingsSelectors.getDefaultMetric(state);

    // calculate
    const results = OneRMCalculator.calculate1RM(exercise, tagsToInclude, tagsToExclude, daysRange, velocity, metric, allSets);

    dispatch({
        type: CALC_1RM,
        velocity: velocity,
        e1RM: results.e1RM,
        r2: results.r2,
        activeChartData: results.active,
        errorChartData: results.errors,
        unusedChartData: results.unused,
        regressionPoints: results.regressionPoints,
        minX: results.minX,
        maxX: results.maxX,
        maxY: results.maxY,
        isRegressionNegative: results.isRegressionNegative,
    });
};

export const presentInfoModal = () => (dispatch, getState) => {
    const state = getState();
    logInfoAnalytics(state);
    Analytics.setCurrentScreen('one_rm_info');

    dispatch({ type: PRESENT_INFO_MODAL });
};

// ANALYTICS

const logEditExerciseAnalytics = (state) => {
    Analytics.logEventWithAppState('one_rm_edit_exercise', {
    }, state);
};

const logEditIncludeTagsAnalytics = (state) => {
    Analytics.logEventWithAppState('one_rm_edit_include_tags', {
    }, state);
};

const logEditExcludeTagsAnalytics = (state) => {
    Analytics.logEventWithAppState('one_rm_edit_exclude_tags', {
    }, state);
};

const logInfoAnalytics = (state) => {
    Analytics.logEventWithAppState('one_rm_info', {
    }, state);
};
