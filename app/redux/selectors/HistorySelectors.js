const stateRoot = (state) => state.history;

export const getExpandedSetID = (state) => stateRoot(state).expandedSetID;

export const getShowRemoved = (state) => stateRoot(state).showRemoved;
