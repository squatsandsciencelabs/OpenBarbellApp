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
import * as SetUtils from 'app/utility/SetUtils';
import * as WeightConversion from 'app/utility/WeightConversion';

export const presentSelectExercise = () => (dispatch, getState) => {
    const state = getState();
    logEditExerciseAnalytics(state);
    Analytics.setCurrentScreen('one_rm_exercise_name');

    dispatch({ type: PRESENT_SELECT_EXERCISE });
};

export const changeVelocitySlider = (velocity) => (dispatch, getState) => {
    const state = getState();
    logEditVelocityAnalytics(state, velocity);

    dispatch({
        type: CHANGE_VELOCITY_SLIDER,
        velocity: velocity,
    });
};

export const changeE1RMDays = (days) => (dispatch, getState) => {
    days = Math.abs(days);

    const state = getState();
    logEditDateRangeAnalytics(state, days);

    dispatch({
        type: CHANGE_1RM_DAYS_RANGE,
        days: days,
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

    // analytics
    logCalculate1RMAnalytics(
        state,
        exercise,
        tagsToInclude ? tagsToInclude.length : 0,
        tagsToExclude ? tagsToExclude.length : 0,
        daysRange,
        velocity,
        results.e1RM,
        results.r2,
        results.active ? results.active.length : 0,
        results.errors ? results.errors.length : 0,
        results.unused ? results.unused.length : 0,
        results.isRegressionNegative,
        results.slope,
        results.minX,
        results.maxX,
        results.minY,
        results.maxY,
        metric
    );

    // dispatch
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

const logEditDateRangeAnalytics = (state, days) => {
    Analytics.logEventWithAppState('one_rm_set_date_range', {
        to_days: days,
    }, state);
};

const logEditVelocityAnalytics = (state, velocity) => {
    Analytics.logEventWithAppState('one_rm_set_velocity', {
        to_velocity: velocity,
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

const logCalculate1RMAnalytics = (state, exercise, numIncludeTags, numExcludeTags, daysRange, velocity, oneRepMax, r2, numActivePoints, numErrorPoints, numUnusedPoints, hasNegSlope, slope, minWeight, maxWeight, minVelocity, maxVelocity, metric) => {
    Analytics.logEvent('one_rm_calculate', {
        exercise: exercise,
        num_include_tags: numIncludeTags,
        num_exclude_tags: numExcludeTags,
        days_range: daysRange,
        velocity: velocity,
        one_rep_max_lb: WeightConversion.weightInLBs(metric, oneRepMax),
        r2: r2,
        num_active_points: numActivePoints,
        num_error_points: numErrorPoints,
        num_unused_points: numUnusedPoints,
        has_negative_slope: hasNegSlope,
        slope: slope,
        min_lb_weight: WeightConversion.weightInLBs(metric, minWeight),
        max_lb_weight: WeightConversion.weightInLBs(metric, maxWeight),
        weight_lb_range: WeightConversion.weightInLBs(metric, (maxWeight - minWeight)),
        min_velocity: minVelocity,
        max_velocity: maxVelocity,
        velocity_range: maxVelocity - minVelocity,
        metric: metric
    }, state);
};

const logInfoAnalytics = (state) => {
    Analytics.logEventWithAppState('one_rm_info', {
    }, state);
};
