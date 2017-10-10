const stateRoot = (state) => state.scannedDevices;

export const getScannedDevices = (state) => stateRoot(state).devices;
