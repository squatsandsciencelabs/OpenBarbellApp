const stateRoot = (state) => state.workoutCollapsed;

export const getIsCollapsed = (state, setID) => stateRoot(state)[setID] === true;
