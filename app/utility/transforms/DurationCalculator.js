export const getDurationTime = (startDate, endDate) => {
    return Math.abs(endDate.getTime() - startDate.getTime());
}