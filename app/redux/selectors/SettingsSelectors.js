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
    return Math.abs(endSetTimerDuration - currentTime);
}

export const getLastExportCSVDate = (state) => stateRoot(state).lastExportCSVDate;

export const getIsEditingLastRepMetric = (state) => stateRoot(state).isEditingLastRepMetric;

export const getIsEditingBestEverMetric = (state) => stateRoot(state).isEditingBestEverMetric;

export const getIsEditingQuantifier = (state) => stateRoot(state).isEditingQuantifier;

export const getCurrentMetric = (state) => stateRoot(state)[stateRoot(state).currentMetricPosition];

export const getCurrentQuantifier = (state) => stateRoot(state)[stateRoot(state).currentQuantifierPosition];
