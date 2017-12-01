import * as RepDataMap from 'app/utility/transforms/RepDataMap';
import {
    EMPTY_METRIC,
    AVG_VELOCITY_METRIC,
    RPE_METRIC,
    DURATION_METRIC,
    ROM_METRIC,
    PKH_METRIC,
    PKV_METRIC,
    EMPTY_QUANTIFIER,
    FIRST_REP_QUANTIFIER,
    LAST_REP_QUANTIFIER,
    MIN_QUANTIFIER,
    MAX_QUANTIFIER,
    AVG_QUANTIFIER,
    ABS_LOSS_QUANTIFIER,
    FASTEST_EVER_QUANTIFIER,
    SLOWEST_EVER_QUANTIFIER,
    SET_LOSS_QUANTIFIER,
    PEAK_END_QUANTIFIER,
} from 'app/constants/CollapsedMetricTypes';

// unique metrics

const getMetrics = (set, metricFunction) => {
    const metrics = [];
    
    set.reps.forEach((rep) => {                
        if (rep.isValid === true && rep.removed === false) {
            const repData = rep.data;
            const metric = Number(metricFunction(repData));
            metrics.push(metric);
        }
    });

    return metrics;
};

export const getRPE = (set) => {
    return set.rpe;
};

export const getAvgVelocities = (set) => {
    return getMetrics(set, RepDataMap.averageVelocity);
};

export const getPKVs = (set) => {
    return getMetrics(set, RepDataMap.peakVelocity);
};

export const getPKHs = (set) => {
    return getMetrics(set, RepDataMap.peakVelocityLocation);
};

export const getROMs = (set) => {
    return getMetrics(set, RepDataMap.rangeOfMotion);
};

export const getDurations = (set) => {
    return getMetrics(set, RepDataMap.durationOfLift);
};

// Average Quantifiers

const getAvgOfMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    const sum = metrics.reduce((previous, current) => current + previous);
    return Number((sum / metrics.length).toFixed(2));
};

export const getAvgOfAvgVelocities = (set) => {
    const velocities = getAvgVelocities(set);
    return getAvgOfMetrics(velocities);
};

export const getAvgPKV = (set) => {
    const pkvs = getPKVs(set);
    return getAvgOfMetrics(pkvs);
};

export const getAvgROM = (set) => {
    const roms = getROMs(set);
    return getAvgOfMetrics(roms);
};

export const getAvgDuration = (set) => {
    const durations = getDurations(set);
    return getAvgOfMetrics(durations);
};

// Absolute Loss Quantifiers

const getAbsLossOfMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    const maxV = Math.max(...metrics);
    const minV = Math.min(...metrics);
    
    return Number((maxV - minV).toFixed(2));
};

export const getAbsLossOfAvgVelocities = (set) => {
    const velocities = getAvgVelocities(set);
    return getAbsLossOfMetrics(velocities);
};

export const getAbsLossOfPKVs = (set) => {
    const pkvs = getPKVs(set);
    return getAbsLossOfMetrics(pkvs);
};

export const getAbsLossOfROMs = (set) => {
    const roms = getROMs(set);
    return getAbsLossOfMetrics(roms);
};

export const getAbsLossOfDurations = (set) => {
    const durations = getDurations(set);
    return getAbsLossOfMetrics(durations);    
};

// First Rep Quantifiers

const getFirstRepOfMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    return Number((metrics[0]).toFixed(2));
};

export const getFirstAvgVelocity = (set) => {
    const velocities = getAvgVelocities(set);
    return getFirstRepOfMetrics(velocities);
};

export const getFirstPKV = (set) => {
    const pkvs = getPKVs(set);
    return getFirstRepOfMetrics(pkvs);
};

export const getFirstPKH = (set) => {
    const pkhs = getPKHs(set);
    return getFirstRepOfMetrics(pkhs);
};

export const getFirstROM = (set) => {
    const roms = getROMs(set);
    return getFirstRepOfMetrics(roms);
};

export const getFirstDuration = (set) => {
    const durations = getDurations(set);
    return getFirstRepOfMetrics(durations);
};

// Last Rep Quantifiers

const getLastRepMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    return Number((metrics[metrics.length - 1]).toFixed(2));
};

export const getLastAvgVelocity = (set) => {
    const velocities = getAvgVelocities(set);
    return getLastRepMetrics(velocities);
};

export const getLastPKV = (set) => {
    const pkvs = getPKVs(set);
    return getLastRepMetrics(pkvs);
};

export const getLastPKH = (set) => {
    const pkhs = getPKHs(set);
    return getLastRepMetrics(pkhs);
};

export const getLastROM = (set) => {
    const roms = getROMs(set);
    return getLastRepMetrics(roms);
};

export const getLastDuration = (set) => {
    const durations = getDurations(set);
    return getLastRepMetrics(durations);
};

// Get Min Quantifiers

const getMinMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    return Number(Math.min(...metrics).toFixed(2));
};

export const getMinAvgVelocity = (set) => {
    const velocities = getAvgVelocities(set);
    return getMinMetrics(velocities);
};

export const getMinPKV = (set) => {
    const pkvs = getPKVs(set);
    return getMinMetrics(pkvs);
};

export const getMinPKH = (set) => {
    const pkhs = getPKHs(set);
    return getMinMetrics(pkhs);
};

export const getMinROM = (set) => {
    const roms = getROMs(set);
    return getMinMetrics(roms);
};

export const getMinDuration = (set) => {
    const durations = getDurations(set);
    return getMinMetrics(durations);
};

// Get Max Quantifiers

const getMaxMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    return Number(Math.max(...metrics).toFixed(2));
};

export const getMaxAvgVelocity = (set) => {
    const velocities = getAvgVelocities(set);
    return getMaxMetrics(velocities);
};

export const getMaxPKV = (set) => {
    const pkvs = getPKVs(set);
    return getMaxMetrics(pkvs);
};

export const getMaxPKH = (set) => {
    const pkhs = getPKHs(set);
    return getMaxMetrics(pkhs);
};

export const getMaxROM = (set) => {
    const roms = getROMs(set);
    return getMaxMetrics(roms);
};

export const getMaxDuration = (set) => {
    const durations = getDurations(set);
    return getMaxMetrics(durations);
};

// Peak-End

const getPeakEnd = (metrics) => {
    const min = getMinMetrics(metrics);
    const lastRepMetric = getLastRepMetrics(metrics);
    
    if (metrics.length > 0) {
        return Number(((lastRepMetric + min) / 2).toFixed(2));
    } else {
        return null;
    }
};

export const getAvgVelocityPeakEnd = (set) => {
    const velocities = getAvgVelocities(set);
    return getPeakEnd(velocities);
};

export const getPKVPeakEnd = (set) => {
    const pkvs = getPKVs(set);
    return getPeakEnd(pkvs);
};

export const getROMPeakEnd = (set) => {
    const roms = getROMs(set);
    return getPeakEnd(roms);
};

export const getDurationPeakEnd = (set) => {
    const durations = getDurations(set);
    return getPeakEnd(durations);
};

// Set Loss

const getMetricSetLoss = (metrics) => {
    const lastRepMetric = getLastRepMetrics(metrics);
    const firstRepMetric = getFirstRepOfMetrics(metrics);

    if (metrics.length > 0) {
        return lastRepMetric - firstRepMetric;
    } else {
        return null;
    }
};

export const getAvgVelocitySetLoss = (set) => {
    const velocities = getAvgVelocities(set);
    return getMetricSetLoss(velocities);
};

export const getPKVSetLoss = (set) => {
    const pkvs = getPKVs(set);
    return getMetricSetLoss(pkvs);
};

export const getROMSetLoss = (set) => {
    const roms = getROMs(set);
    return getMetricSetLoss(roms);
};

export const getDurationSetLoss = (set) => {
    const durations = getDurations(set);
    return getMetricSetLoss(durations);
};

// To String

export const metricAbbreviation = (metric) => {
    switch (metric) {
        case EMPTY_METRIC:
            return '';
        case AVG_VELOCITY_METRIC:
            return 'VEL';
        case RPE_METRIC:
            return 'RPE';
        case DURATION_METRIC:
            return 'DUR';
        case ROM_METRIC:
            return 'ROM';
        case PKH_METRIC:
            return 'PKH';
        case PKV_METRIC:
            return 'PKV';
        default:
            return null;
    };
};

export const metricString = (metric) => {
    switch (metric) {
        case EMPTY_METRIC:
            return '';
        case AVG_VELOCITY_METRIC:
            return 'Average Velocity';
        case RPE_METRIC:
            return 'RPE';
        case DURATION_METRIC:
            return 'Duration';
        case ROM_METRIC:
            return 'Range Of Motion';
        case PKH_METRIC:
            return 'Peak Height';
        case PKV_METRIC:
            return 'Peak Velocity';
        default:
            return null;
    };
};

export const metricUnit = (metric) => {
    switch (metric) {
        case EMPTY_METRIC:
            return '';
        case AVG_VELOCITY_METRIC:
            return 'm/s';
        case DURATION_METRIC:
            return 'sec';
        case ROM_METRIC:
            return 'mm';
        case PKH_METRIC:
            return '%';
        case PKV_METRIC:
            return 'm/s';
        default:
            return null;
    };
};

export const quantifierAbbreviation = (quantifier) => {
    switch (quantifier) {
        case EMPTY_QUANTIFIER:
            return '';
        case FIRST_REP_QUANTIFIER:
            return 'FIRST';
        case LAST_REP_QUANTIFIER:
            return 'LAST';
        case MIN_QUANTIFIER:
            return 'MIN';
        case MAX_QUANTIFIER:
            return 'MAX';
        case AVG_QUANTIFIER:
            return 'AVG';
        case ABS_LOSS_QUANTIFIER:
            return 'ABSL';
        case FASTEST_EVER_QUANTIFIER:
            return 'FASTEST';
        case SLOWEST_EVER_QUANTIFIER:
            return 'SLOWEST';
        case SET_LOSS_QUANTIFIER:
            return 'LOSS';
        case PEAK_END_QUANTIFIER: 
            return 'PKEND';
        default:
            return null;
    };
};

export const quantifierString = (quantifier) => {
    switch (quantifier) {
        case EMPTY_QUANTIFIER:
            return '';
        case FIRST_REP_QUANTIFIER:
            return 'First Rep';
        case LAST_REP_QUANTIFIER:
            return 'Last Rep';
        case MIN_QUANTIFIER:
            return 'Minimum';
        case MAX_QUANTIFIER:
            return 'Maximum';
        case AVG_QUANTIFIER:
            return 'Average';
        case ABS_LOSS_QUANTIFIER:
            return 'Absolute Loss';
        case FASTEST_EVER_QUANTIFIER:
            return 'Fastest Ever';
        case SLOWEST_EVER_QUANTIFIER:
            return 'Slowest Ever';
        case SET_LOSS_QUANTIFIER:
            return 'Set Loss';
        case PEAK_END_QUANTIFIER: 
            return 'Peak-End';
        default:
            return null;
    };
};
