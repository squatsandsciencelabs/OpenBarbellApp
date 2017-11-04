const stateRoot = (state) => state.historyCollapsed;

export const getIsCollapsed = (state, setID) => stateRoot(state)[setID] === true;
