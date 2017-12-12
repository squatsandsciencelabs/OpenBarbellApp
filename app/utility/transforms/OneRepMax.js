import regression from 'regression';

export const OneRMPrediction = (data, velocity) => {
    // gather points
    const result = regression.linear(data, { precision: 4 });

    //prediction
    // 
    return Number(((velocity - result.equation[1]) / result.equation[0]).toFixed(0));
}
