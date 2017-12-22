import regression from 'regression';

// Data must be an array of arrays, sub arrays representing X, and Y values
export const get1rmPrediction = (data, velocity) => {
    // gather points
    // precision is 4 for accuracy of regression points in the library
    const result = regression.linear(data, { precision: 4 });

    // prediction
    // solving for x instead of y (x being weight, y being vel)
    return Number(((velocity - result.equation[1]) / result.equation[0]).toFixed(0));
}

export const getConfidenceInterval = (data) => {
    // gather points
    // precision is 4 for accuracy of regression points in the library
    const result = regression.linear(data, { precision: 4 });

    // r2 prediction
    return Number((result.r2 * 100).toFixed(0));
}
