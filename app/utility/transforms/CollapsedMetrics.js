import * as RepDataMap from 'app/utility/transforms/RepDataMap';

// unique metrics

const getMetrics = (set, metricFunction) => {
    const metrics = [];
    
    set.reps.forEach((rep) => {                
        if (rep.isValid === true && rep.removed === false) {
            let repData = rep.data;
        
            metrics.push(Number(metricFunction(repData)));
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

// Quantifiers

export const getAvgOfMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    const sum = metrics.reduce((previous, current) => current + previous);
    return Number((sum / metrics.length).toFixed(2));
};

export const getAbsLossOfMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    const maxV = Math.max(...metrics);
    const minV = Math.min(...metrics);
    
    return maxV - minV;
};

export const getFirstRepofMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    return metrics[0];
};

export const getLastRepMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    return metrics[metrics.length - 1];
};

export const getMinMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    return Math.min(...metrics);
};

export const getMaxMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    return Math.max(...metrics);
};
