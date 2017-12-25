const stateRoot = (state) => state.appState;

export const getScreenStatus = (state) => stateRoot(state).screenStatus;

export const getNumLocks = (state) => stateRoot(state).lockedCounter;

export const getNumMultiTask = (state) => stateRoot(state).multiTaskCounter;

export const getTabIndex = (state) => stateRoot(state).tabIndex;

export const getTabSwipeEnabled = (state) => stateRoot(state).tabSwipeEnabled;
