const stateRoot = (state) => state.workoutCollapsed;

export const getIsCollapsed = (state, setID) => {
    let returnval = stateRoot(state)[setID] === true;
    console.tron.log(stateRoot(state) + " " + setID + " " + stateRoot(state)[setID] + " asdf " + returnval);
    return stateRoot(state)[setID] === true;
}
