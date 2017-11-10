const stateRoot = (state) => state.workoutCollapsed;

export const getIsCollapsed = (state, setID) => {
    return stateRoot(state)[setID] !== false;
};
