// NOTE: must be added to the list AFTER EndOldWorkoutSaga
// Reason is that it wants to pull the number of workout sets on startup if it was indeed eliminated
// It's also why this is a saga rather than added to the StoreActionCreators

import { take, select, put } from 'redux-saga/effects';
import * as Analytics from 'app/services/Analytics';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as AnalysisActionCreators from 'app/redux/shared_actions/AnalysisActionCreators';

import {
    STORE_INITIALIZED,
} from 'app/configs+constants/ActionTypes';

const OneRMLastCalculateAnalyticsSaga = function * OneRMLastCalculateAnalyticsSaga() {
    yield take(STORE_INITIALIZED);
    const state = yield select();

    const e1RMLastCalcs = AnalysisSelectors.getE1RMCalcs(state);
    const e1RMLastCalcCount = AnalysisSelectors.getE1RMCalcsCount(state);

    e1RMLastCalcs.forEach((e1RMLastCalc) => {
    
        logLast1RMCalcAnalytics(
            e1RMLastCalc.exercise,
            e1RMLastCalc.num_include_tags, 
            e1RMLastCalc.num_exclude_tags,
            e1RMLastCalc.days_range,
            e1RMLastCalc.velocity,
            e1RMLastCalc.one_rep_max,
            e1RMLastCalc.r2,
            e1RMLastCalc.num_active_points,
            e1RMLastCalc.num_error_points,
            e1RMLastCalc.num_unused_points,
            e1RMLastCalc.has_negative_slope,
            e1RMLastCalc.slope,
            e1RMLastCalc.min_lb_weight,
            e1RMLastCalc.max_lb_weight,
            e1RMLastCalc.weight_lb_range,
            e1RMLastCalc.min_velocity,
            e1RMLastCalc.max_velocity,
            e1RMLastCalc.velocity_range,
            e1RMLastCalc.metric,
            state,
        );

    });

    yield put(AnalysisActionCreators.clearE1RMCalcs());
};


const logLast1RMCalcAnalytics = (exercise, numIncludeTags, numExcludeTags, daysRange, velocity, oneRepMax, r2, numActivePoints, numErrorPoints, numUnusedPoints, hasNegSlope, slope, minWeightLB, maxWeightLB, weightLBRange, minVelocity, maxVelocity, velocityRange, metric, state) => {
    Analytics.logEventWithAppState('one_rm_last_calculate', {
        exercise: exercise,
        num_include_tags: numIncludeTags,
        num_exclude_tags: numExcludeTags,
        days_range: daysRange,
        velocity: velocity,
        one_rep_max: oneRepMax,
        r2: r2,
        num_active_points: numActivePoints,
        num_error_points: numErrorPoints,
        num_unused_points: numUnusedPoints,
        has_negative_slope: hasNegSlope,
        slope: slope,
        min_lb_weight: minWeightLB,
        max_lb_weight: maxWeightLB,
        weight_lb_range: weightLBRange,
        min_velocity: minVelocity,
        max_velocity: maxVelocity,
        velocity_range: velocityRange,
        metric: metric
    }, state);
};

// TODO: write a unit test for this
// this is waiting for a system to test sagas

export default OneRMLastCalculateAnalyticsSaga;
