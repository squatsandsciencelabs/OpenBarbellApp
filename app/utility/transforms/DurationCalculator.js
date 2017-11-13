// duration calculator

// TODO: do we want this to be negative ever? Or just 0 as minimum?
// ABS is dangerous
export const getDurationBetween = (startDate, endDate) => {
    if (typeof startDate !== 'number') {
        startDate = Date.parse(startDate);
    }
    if (typeof endDate !== 'number') {
        endDate = Date.parse(endDate);
    }

    return Math.abs(endDate - startDate);
};
