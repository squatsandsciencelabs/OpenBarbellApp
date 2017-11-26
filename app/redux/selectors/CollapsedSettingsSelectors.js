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
    const root = stateRoot(state);
    switch (root.currentMetricRank) {
        case 1:
            return root.metric1;
        case 2:
            return root.metric2;
        case 3:
            return root.metric3;
        case 4:
            return root.metric4;
        case 5:
            return root.metric5;
        default:
            return null;
    }
};

export const getCurrentQuantifier = (state) => {
    const root = stateRoot(state);
    switch (root.currentQuantifierRank) {
        case 1:
            return root.quantifier1;
        case 2:
            return root.quantifier2;
        case 3:
            return root.quantifier3;
        case 4:
            return root.quantifier4;
        case 5:
            return root.quantifier5;
        default:
            return null;
    }
};
