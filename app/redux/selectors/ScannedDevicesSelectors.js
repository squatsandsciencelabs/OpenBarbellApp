const stateRoot = (state) => state.scannedDevices;

export const getScannedDevices = (state) => stateRoot(state).devices;

export const getNumScannedDevices = (state) => stateRoot(state).devices.length;

export const getIsManualScan = (state) => stateRoot(state).isManualScan;

export const getManualScannedNone = (state) => {
    if (!getIsManualScan(state)) {
        return false;
    }

    return getNumScannedDevices(state) <= 0;
};
