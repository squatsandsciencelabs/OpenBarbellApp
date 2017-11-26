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
    BEST_EVER_QUANTIFIER,
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
}

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
            return 'ABS LOSS';
        case BEST_EVER_QUANTIFIER:
            return 'Best';
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
        case BEST_EVER_QUANTIFIER:
            return 'Best Ever';
        default:
            return null;
    };
};
