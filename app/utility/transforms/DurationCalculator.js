// duration calculator

export const getDurationBetween = (startDate, endDate) => {
    return Math.abs(Date.parse(new Date()) - Date.parse(startDate));
};
