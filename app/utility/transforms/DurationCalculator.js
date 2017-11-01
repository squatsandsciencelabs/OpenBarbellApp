// duration calculator

// TODO: do we want this to be negative ever? Or just 0 as minimum?
// ABS is dangerous
export const getDurationBetween = (startDate, endDate) => {
    return Math.abs(Date.parse(endDate) - Date.parse(startDate));
};
