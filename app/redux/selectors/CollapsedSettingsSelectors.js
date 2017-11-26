const stateRoot = (state) => state.collapsedSettings;

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

export const getIsEditingMetric = (state) => stateRoot(state).currentMetricRank !== null;

export const getIsEditingQuantifier = (state) => stateRoot(state).currentQuantifierRank !== null;

export const getCurrentMetric = (state) => {
    switch (state.currentMetricRank) {
        case 1:
            return state.metric1;
        case 2:
            return state.metric2;
        case 3:
            return state.metric3;
        case 4:
            return state.metric4;
        case 5:
            return state.metric5;
        default:
            return null;
    }
};

export const getCurrentQuantifier = (state) => {
    switch (state.currentQuantifierRank) {
        case 1:
            return state.quantifier1;
        case 2:
            return state.quantifier2;
        case 3:
            return state.quantifier3;
        case 4:
            return state.quantifier4;
        case 5:
            return state.quantifier5;
        default:
            return null;
    }
};
