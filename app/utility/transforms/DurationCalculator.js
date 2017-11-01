// duration calculator

export const getDurationBetween = (startDate, endDate) => {
    return Math.abs(Date.parse(endDate) - Date.parse(startDate));
};
