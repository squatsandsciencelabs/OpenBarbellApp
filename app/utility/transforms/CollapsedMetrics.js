import * as RepDataMap from 'app/utility/transforms/RepDataMap';

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
    return (getAvgOfMetrics(durations) / 1000000.0).toFixed(2)
};

// Absolute Loss Quantifiers

const getAbsLossOfMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    const maxV = Math.max(...metrics);
    const minV = Math.min(...metrics);
    
    return maxV - minV;
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
    return (getAbsLossOfMetrics(durations) / 1000000.0).toFixed(2)
};

// First Rep Quantifiers

const getFirstRepOfMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    return metrics[0];
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
    const first = getFirstRepOfMetrics(durations)
    return (getFirstRepOfMetrics(durations) / 1000000.0).toFixed(2)
};

// Last Rep Quantifiers

const getLastRepMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    return metrics[metrics.length - 1];
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
    return (getLastRepMetrics(durations) / 1000000.0).toFixed(2)
};

// Get Min Quantifiers

const getMinMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    return Math.min(...metrics);
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
    return (getMinMetrics(durations) / 1000000.0).toFixed(2)
};

// Get Max Quantifiers

const getMaxMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    return Math.max(...metrics);
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
    return (getMaxMetrics(durations) / 1000000.0).toFixed(2)
};
