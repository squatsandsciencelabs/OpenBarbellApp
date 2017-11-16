import * as RepDataMap from 'app/utility/transforms/RepDataMap';

// unique metrics

export const getAvgVelocities = (set, metrics) => {
    const velocities = [];
    
    set.reps.forEach((rep) => {                
        if (rep.isValid === true && rep.removed === false) {
            let repData = rep.data;
        
            velocities.push(Number(RepDataMap.averageVelocity(repData)));
        }            
    });

    return velocities;
};


export const getROMs = (set) => {
    let roms = [];
    
    set.reps.forEach((rep) => {                
        if (rep.isValid === true && rep.removed === false) {
            let repData = rep.data;
        
            roms.push(Number(RepDataMap.rangeOfMotion(repData)));
        }            
    });

    return roms;
};


// Quantifiers

export const getAvgofMetrics = (metrics) => {
    
    if (metrics.length > 0) {
        let sum = metrics.reduce((previous, current) => current + previous);
        return Number((sum / metrics.length).toFixed(2));
    } else {
        return null;
    }  
};
    
export const getAbsLossOfMetrics = (metrics) => {

    if (metrics.length > 0) {
        let maxV = Math.max(...metrics);
        let minV = Math.min(...metrics);
        
        return maxV - minV;
    } else {
        return null;
    }
};

export const getFirstRepofMetrics = (metrics) => {
    
    if (metrics.length > 0) {
        return metrics[0];
    } else {
        return null;
    }
};

export const getLastRepMetrics = (metrics) => {
        
    if (metrics.length > 0) {
        return metrics[metrics.length - 1];
    } else {
        return null;
    }
};

export const getMinMetrics = (metrics) => {
    
    if (metrics.length > 0) {
        return Math.min(...metrics);
    } else {
        return null;
    }
};

export const getMaxMetrics = (metrics) => {
        
    if (metrics.length > 0) {
        return Math.max(...metrics);    
    } else {
        return null;
    }
};
