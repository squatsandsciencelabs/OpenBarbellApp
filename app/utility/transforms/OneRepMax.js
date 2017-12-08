import regression from 'regression';

export const velocityPrediction = (data, weight) => {
    // gather points
    const result = regression.linear(data, { precision: 4 });

    //prediction
    return Number(result.predict(weight)[1].toFixed(2));
}
