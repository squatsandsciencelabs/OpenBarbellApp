import * as RepDataMap from 'app/utility/transforms/RepDataMap';

export const getAvgVelocities = (set) => {
    let velocities = [];
    
    for (let i = 0; i < set.reps.length; i++) {
        let rep = matchedSet.reps[i];
                
        if (rep.isValid == true) {
            let repData = rep.data;
        
            velocities.push(RepDataMap.averageVelocity(repData));
        }            
    };

    return velocities.map(vel => Number(vel));;
};

export const getAvgofAvgVelocities = (set) => {
    let avgVs = getAvgVelocites(set);

    let sum = avgVs.reduce((previous, current) => current += previous);
    return sum / avgVs.length;    
};

export const getAbsLossVelocity = (set) => {
    let avgVs = getAvgVelocities(set);

    let maxV = Math.max(...avgVs);
    let minV = Math.min(...avgVs);

    return maxV - minV;
};

export const getFirstRepAvgVelocity = (set) => {
    let avgVs = getAvgVelocities(set);
    
    return avgVs[0];
};

export const getLastRepAvgVelocity = (set) => {
    let avgVs = getAvgVelocities(set);
    
    return avgVs[avgVs.length - 1];
};

export const getMinAvgVelocity = (set) => {
    let avgVs = getAvgVelocities(set);

    return Math.min(...avgVs);
};

export const getMaxAvgVelocity = (set) => {
    let avgVs = getAvgVelocities(set);
    
    return Math.max(...avgVs);    
};
