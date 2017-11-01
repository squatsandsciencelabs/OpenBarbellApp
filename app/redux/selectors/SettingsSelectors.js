const stateRoot = (state) => state.settings;

export const getIsEditingDefaultMetric = (state) => stateRoot(state).isEditingDefaultMetric;

export const getDefaultMetric = (state) => stateRoot(state).defaultMetric;

export const getIsEditingEndSetTimer = (state) => stateRoot(state).isEditingEndSetTimer;

export const getEndSetTimerDuration = (state) => stateRoot(state).endSetTimerDuration;

export const getIfTimerWasEdited = (state) => stateRoot(state).wasTimerEdited;

export const getIsExportingCSV = (state) => stateRoot(state).isExportingCSV;

export const getShowRemoved = (state) => stateRoot(state).showRemoved;

export const getEndSetTimeLeft = (state) => {
    const endSetTimerDuration = getEndSetTimerDuration(state);
    const currentTime = Date.now();
    return Math.abs(endSetTimerDuration - Date.parse(currentTime));
}

export const getLastExportCSVDate = (state) => stateRoot(state).lastExportCSVDate;
