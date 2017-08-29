const stateRoot = (state) => state.connectedDevice;

export const getConnectedDeviceStatus = (state) => stateRoot(state).status;

export const getConnectedDeviceName = (state) => stateRoot(state).deviceName;

export const getConnectedDeviceIdentifier = (state) => stateRoot(state).deviceIdentifier;
