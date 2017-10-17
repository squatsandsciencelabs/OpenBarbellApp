const stateRoot = (state) => state.connectedDevice;

export const getConnectedDeviceStatus = (state) => {
    let root = stateRoot(state);
    if (root.isReconnecting) {
        return 'RECONNECTING';
    } else {
        return root.status;
    }
};

export const getConnectedDeviceName = (state) => stateRoot(state).deviceName;

export const getConnectedDeviceIdentifier = (state) => stateRoot(state).deviceIdentifier;

export const getNumDisconnects = (state) => stateRoot(state).numDisconnects;

export const getNumReconnects = (state) => stateRoot(state).numReconnects;
