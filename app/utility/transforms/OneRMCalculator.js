import regression from 'regression';

// Data must be an array of arrays, sub arrays representing X, and Y values
export const calc1rm = (data, velocity) => {
    if (!data) {
        return null;
    }
    // gather points
    // precision is 4 for accuracy of regression points in the library
    const result = regression.linear(data, { precision: 4 });
    
    // prediction
    // solving for x instead of y (x being weight, y being vel)
    return Number(((velocity - result.equation[1]) / result.equation[0]).toFixed(0));
};

export const getR2interval = (data) => {
    // gather points
    // precision is 4 for accuracy of regression points in the library
    const result = regression.linear(data, { precision: 4 });

    // r2 prediction
    return Number((result.r2 * 100).toFixed(0));
};

export const calcVel = (data, weight) => {
    if (!data) {
        return null;
    }

    const result = regression.linear(data, { precision: 4 });

    return result.predict(weight);
};

export const getRegressionPoints = (data) => {
    if (!data) {
        return null;
    }
    // gather points
    // precision is 4 for accuracy of regression points in the library
    const result = regression.linear(data, { precision: 4 });
    
    return result.points;
};

export const lowestWeight = (data) => {
    if (!data) {
        return null;
    }
    return Math.min.apply(Math, data.map((point) => { return point.x; }));
};

export const highestWeight = (data) => {
    if (!data) {
        return null;
    }
    return Math.max.apply(Math, data.map((point) => { return point.x; }));
};

export const highestWeightPossible = (regressionPoints) => {
    if (!regressionPoints) {
        return null;
    }
    const first = regressionPoints[0];
    const second = regressionPoints[regressionPoints.length - 1];
    const slope = (second.y - first.y) / (second.x - first.x);
    const yint = first.y - (slope * first.x);
    return -1 * yint / slope;
};

export const highestVelocity = (data) => {
    if (!data) {
        return null;
    }
    return Math.max.apply(Math, data.map((point) => { return point.y; }));
};
