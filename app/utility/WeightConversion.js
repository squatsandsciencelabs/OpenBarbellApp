export const weightInLBs = (metric, weight) => {
    if (metric === 'lbs' && weight) {
        return Number(weight);
    } else if (metric === 'kgs' && weight) {
        return Number(weight) * 2.20462262;
    } else {
        return null;
    }
};

export const weightInKGs = (metric, weight) => {
    if (metric === 'kgs' && weight) {
        return Number(weight);
    } else if (metric === 'lbs' && weight) {
        return Number(weight) * 0.45359237;
    } else {
        return null;
    }
};
