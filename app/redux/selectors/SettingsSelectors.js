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

export const getMetric1 = (state) => stateRoot(state).metric1;

export const getMetric2 = (state) => stateRoot(state).metric2;

export const getMetric3 = (state) => stateRoot(state).metric3;

export const getMetric4 = (state) => stateRoot(state).metric4;

export const getMetric5 = (state) => stateRoot(state).metric5;

export const getQuantifier1 = (state) => stateRoot(state).quantifier1;

export const getQuantifier2 = (state) => stateRoot(state).quantifier2;

export const getQuantifier3 = (state) => stateRoot(state).quantifier3;

export const getQuantifier4 = (state) => stateRoot(state).quantifier4;

export const getQuantifier5 = (state) => stateRoot(state).quantifier5;

export const getIsEditingMetric = (state) => stateRoot(state).isEditingMetric;

export const getIsEditingAvgMetric = (state) => stateRoot(state).isEditingAvgMetric;

export const getIsEditingBestEverMetric = (state) => stateRoot(state).isEditingBestEverMetric;

export const getIsEditingQuantifier = (state) => stateRoot(state).isEditingQuantifier;

export const getCurrentMetricPosition = (state) => stateRoot(state).currentMetricPosition;

export const getCurrentQuantifierPosition = (state) => stateRoot(state).currentQuantifierPosition;

export const getCurrentMetric = (state) => stateRoot(state)[stateRoot(state).currentMetricPosition];

export const getCurrentQuantifier = (state) => stateRoot(state)[stateRoot(state).currentQuantifierPosition];
