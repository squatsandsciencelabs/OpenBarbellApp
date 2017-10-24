const stateRoot = (state) => state.settings;

export const getIsEditingDefaultMetric = (state) => stateRoot(state).isEditingDefaultMetric;

export const getDefaultMetric = (state) => stateRoot(state).defaultMetric;

export const getIsEditingEndSetTimer = (state) => stateRoot(state).isEditingEndSetTimer;

export const getEndSetTimerDuration = (state) => stateRoot(state).endSetTimerDuration;

export const getIfTimerWasEdited = (state) => stateRoot(state).wasTimerEdited;

export const getIsExportingCSV = (state) => stateRoot(state).isExportingCSV;

export const getShowRemoved = (state) => stateRoot(state).showRemoved;

export const endSetTimeLeft = (state) => {
    const endSetTimerDuration = getEndSetTimerDuration(state);
    const currentTime = new Date();
    const timeLeft = Math.abs(endSetTimerDuration - currentTime.getTime())

    return timeLeft;
}

export const getlastExportCSVDate = (state) => stateRoot(state).lastExportCSVDate;
