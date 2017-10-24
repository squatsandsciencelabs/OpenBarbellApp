const stateRoot = (state) => state.appState;

export const getScreenStatus = (state) => stateRoot(state).screenStatus;

export const getNumLocks = (state) => stateRoot(state).lockedCounter;

export const getNumMultiTask = (state) => stateRoot(state).multiTaskCounter;
