import * as RepDataMap from 'app/utility/transforms/RepDataMap';

export const getAvgVelocities = (set) => {
    let velocities = [];
    
    for (let i = 0; i < set.reps.length; i++) {
        let rep = set.reps[i];
                
        if (rep.isValid === true && rep.removed === false) {
            let repData = rep.data;
        
            velocities.push(Number(RepDataMap.averageVelocity(repData)));
        }            
    };

    return velocities;
};

export const getAvgofAvgVelocities = (set) => {
    let avgVs = getAvgVelocities(set);

    if (avgVs.length > 0) {
        let sum = avgVs.reduce((previous, current) => current + previous);
        return (sum / avgVs.length).toFixed(2);
    } else {
        return null;
    }  
};

export const getAbsLossVelocity = (set) => {
    let avgVs = getAvgVelocities(set);

    if (avgVs.length > 0) {
        let maxV = Math.max(...avgVs);
        let minV = Math.min(...avgVs);
        
        return maxV - minV;
    } else {
        return null;
    }
};

export const getFirstRepAvgVelocity = (set) => {
    let avgVs = getAvgVelocities(set);
    
    if (avgVs.length > 0) {
        return avgVs[0];
    } else {
        return null;
    }
};

export const getLastRepAvgVelocity = (set) => {
    let avgVs = getAvgVelocities(set);
    
    if (avgVs.length > 0) {
        return avgVs[avgVs.length - 1];
    } else {
        return null;
    }
};

export const getMinAvgVelocity = (set) => {
    let avgVs = getAvgVelocities(set);

    if (avgVs.length > 0) {
        return Math.min(...avgVs);
    } else {
        return null;
    }
};

export const getMaxAvgVelocity = (set) => {
    let avgVs = getAvgVelocities(set);
    
    if (avgVs.length > 0) {
        return Math.max(...avgVs);    
    } else {
        return null;
    }
};

// ROM

export const getROMs = (set) => {
    let roms = [];
    
    for (let i = 0; i < set.reps.length; i++) {
        let rep = set.reps[i];
                
        if (rep.isValid === true && rep.removed === false) {
            let repData = rep.data;
        
            roms.push(Number(RepDataMap.rangeOfMotion(repData)));
        }            
    };

    return roms;
};

export const getAvgofROMs = (set) => {
    let roms = getROMs(set);

    if (roms.length > 0) {
        let sum = roms.reduce((previous, current) => current + previous);
        return (sum / roms.length).toFixed(2);
    } else {
        return null;
    }  
};

export const getAbsLossROM = (set) => {
    let roms = getROMs(set);

    if (roms.length > 0) {
        let maxV = Math.max(...roms);
        let minV = Math.min(...roms);
        
        return maxV - minV;
    } else {
        return null;
    }
};

export const getFirstRepROM = (set) => {
    let roms = getROMs(set);
    
    if (roms.length > 0) {
        return roms[0];
    } else {
        return null;
    }
};

export const getLastRepROM = (set) => {
    let roms = getROMs(set);
    
    if (roms.length > 0) {
        return roms[roms.length - 1];
    } else {
        return null;
    }
};

export const getMinROM = (set) => {
    let roms = getROMs(set);

    if (roms.length > 0) {
        return Math.min(...roms);
    } else {
        return null;
    }
};

export const getMaxROM = (set) => {
    let roms = getROMs(set);
    
    if (roms.length > 0) {
        return Math.max(...roms);    
    } else {
        return null;
    }
};

// peak velocity

export const getPKVs = (set) => {
    let pkvs = [];
    
    for (let i = 0; i < set.reps.length; i++) {
        let rep = set.reps[i];
                
        if (rep.isValid === true && rep.removed === false) {
            let repData = rep.data;
        
            pkvs.push(Number(RepDataMap.peakVelocity(repData)));
        }            
    };

    return pkvs;
};

export const getAvgofPKVs = (set) => {
    let pkvs = getPKVs(set);

    if (pkvs.length > 0) {
        let sum = pkvs.reduce((previous, current) => current + previous);
        return (sum / pkvs.length).toFixed(2);
    } else {
        return null;
    }  
};

export const getAbsLossPKV = (set) => {
    let pkvs = getPKVs(set);

    if (pkvs.length > 0) {
        let maxV = Math.max(...pkvs);
        let minV = Math.min(...pkvs);
        
        return maxV - minV;
    } else {
        return null;
    }
};

export const getFirstRepPKV = (set) => {
    let pkvs = getPKVs(set);
    
    if (pkvs.length > 0) {
        return pkvs[0];
    } else {
        return null;
    }
};

export const getLastRepPKV = (set) => {
    let pkvs = getPKVs(set);
    
    if (pkvs.length > 0) {
        return pkvs[pkvs.length - 1];
    } else {
        return null;
    }
};

export const getMinPKV = (set) => {
    let pkvs = getPKVs(set);

    if (pkvs.length > 0) {
        return Math.min(...pkvs);
    } else {
        return null;
    }
};

export const getMaxPKV = (set) => {
    let pkvs = getPKVs(set);
    
    if (pkvs.length > 0) {
        return Math.max(...pkvs);    
    } else {
        return null;
    }
};

// peak height

export const getPKHs = (set) => {
    let pkhs = [];
    
    for (let i = 0; i < set.reps.length; i++) {
        let rep = set.reps[i];
                
        if (rep.isValid === true && rep.removed === false) {
            let repData = rep.data;
        
            pkhs.push(Number(RepDataMap.peakVelocityLocation(repData)));
        }            
    };

    return pkhs;
};

export const getAvgofPKHs = (set) => {
    let pkhs = getPKHs(set);

    if (pkhs.length > 0) {
        let sum = pkhs.reduce((previous, current) => current + previous);
        return (sum / pkhs.length).toFixed(2);
    } else {
        return null;
    }  
};

export const getAbsLossPKH = (set) => {
    let pkhs = getPKHs(set);

    if (pkhs.length > 0) {
        let maxV = Math.max(...pkhs);
        let minV = Math.min(...pkhs);
        
        return maxV - minV;
    } else {
        return null;
    }
};

export const getFirstRepPKH = (set) => {
    let pkhs = getPKHs(set);
    
    if (pkhs.length > 0) {
        return pkhs[0];
    } else {
        return null;
    }
};

export const getLastRepPKH = (set) => {
    let pkhs = getPKHs(set);
    
    if (pkhs.length > 0) {
        return pkhs[pkhs.length - 1];
    } else {
        return null;
    }
};

export const getMinPKH = (set) => {
    let pkhs = getPKHs(set);

    if (pkhs.length > 0) {
        return Math.min(...pkhs);
    } else {
        return null;
    }
};

export const getMaxPKH = (set) => {
    let pkhs = getPKHs(set);
    
    if (pkhs.length > 0) {
        return Math.max(...pkhs);    
    } else {
        return null;
    }
};

// duration

export const getDurations = (set) => {
    let durations = [];
    
    for (let i = 0; i < set.reps.length; i++) {
        let rep = set.reps[i];
                
        if (rep.isValid === true && rep.removed === false) {
            let repData = rep.data;
        
            durations.push(Number(RepDataMap.durationOfLift(repData)));
        }            
    };

    return durations;
};

export const getAvgofDurations = (set) => {
    let durations = getDurations(set);

    if (durations.length > 0) {
        let sum = durations.reduce((previous, current) => current + previous);
        return (sum / durations.length).toFixed(2);
    } else {
        return null;
    }  
};

export const getAbsLossDuration = (set) => {
    let durations = getDurations(set);

    if (durations.length > 0) {
        let maxV = Math.max(...durations);
        let minV = Math.min(...durations);
        
        return maxV - minV;
    } else {
        return null;
    }
};

export const getFirstRepDuration = (set) => {
    let durations = getDurations(set);
    
    if (durations.length > 0) {
        return durations[0];
    } else {
        return null;
    }
};

export const getLastRepDuration = (set) => {
    let durations = getDurations(set);
    
    if (durations.length > 0) {
        return durations[durations.length - 1];
    } else {
        return null;
    }
};

export const getMinDuration = (set) => {
    let durations = getDurations(set);

    if (durations.length > 0) {
        return Math.min(...durations);
    } else {
        return null;
    }
};

export const getMaxDuration = (set) => {
    let durations = getDurations(set);
    
    if (durations.length > 0) {
        return Math.max(...durations);    
    } else {
        return null;
    }
};
