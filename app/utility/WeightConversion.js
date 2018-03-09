export const weightInLBs = (metric, weight) => {
    if (metric === 'lbs') {
        return Number(weight);
    } else if (metric === 'kgs') {
        return Number(weight) * 2.20462262;
    } else {
        return null;
    }
};

export const weightInKGs = (metric, weight) => {
    if (metric === 'kgs') {
        return Number(weight);
    } else if (metric === 'lbs') {
        return Number(weight) * 0.45359237;
    } else {
        return null;
    }
};
