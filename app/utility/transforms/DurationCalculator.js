// duration calculator

export const getDurationBetween = (startDate, endDate) => {
    return Math.abs(endDate.getTime() - startDate.getTime());
}