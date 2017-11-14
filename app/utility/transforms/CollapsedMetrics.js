import * as RepDataMap from 'app/utility/transforms/RepDataMap';

export const getAvgVelocities = (set) => {
    const velocities = [];
    
    set.reps.forEach((rep) => {                
        if (rep.isValid === true && rep.removed === false) {
            let repData = rep.data;
        
            velocities.push(Number(RepDataMap.averageVelocity(repData)));
        }            
    });

    return velocities;
};

export const getAvgofAvgVelocities = (set) => {
    const avgVs = getAvgVelocities(set);

    if (avgVs.length > 0) {
        let sum = avgVs.reduce((previous, current) => current + previous);
        return Number((sum / avgVs.length).toFixed(2));
    } else {
        return null;
    }  
};

export const getAbsLossVelocity = (set) => {
    const avgVs = getAvgVelocities(set);

    if (avgVs.length > 0) {
        let maxV = Math.max(...avgVs);
        let minV = Math.min(...avgVs);
        
        return maxV - minV;
    } else {
        return null;
    }
};

export const getFirstRepAvgVelocity = (set) => {
    const avgVs = getAvgVelocities(set);
    
    if (avgVs.length > 0) {
        return avgVs[0];
    } else {
        return null;
    }
};

export const getLastRepAvgVelocity = (set) => {
    const avgVs = getAvgVelocities(set);
    
    if (avgVs.length > 0) {
        return avgVs[avgVs.length - 1];
    } else {
        return null;
    }
};

export const getMinAvgVelocity = (set) => {
    const avgVs = getAvgVelocities(set);

    if (avgVs.length > 0) {
        return Math.min(...avgVs);
    } else {
        return null;
    }
};

export const getMaxAvgVelocity = (set) => {
    const avgVs = getAvgVelocities(set);
    
    if (avgVs.length > 0) {
        return Math.max(...avgVs);    
    } else {
        return null;
    }
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

export const getAvgofROMs = (set) => {
    let roms = getROMs(set);

    if (roms.length > 0) {
        let sum = roms.reduce((previous, current) => current + previous);
        return Number((sum / roms.length).toFixed(2));
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
