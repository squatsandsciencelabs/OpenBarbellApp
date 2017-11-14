const stateRoot = (state) => state.historyCollapsed;

export const getIsCollapsed = (state, setID) => {
    return stateRoot(state)[setID] !== false;
};

export const getCollapsedModel = (state) => stateRoot(state);
