const stateRoot = (state) => state.history;

export const getExpandedSetID = (state) => stateRoot(state).expandedSetID;

export const getShowRemoved = (state) => stateRoot(state).showRemoved;

export const getIsRecording = (state) => stateRoot(state).isRecording;

export const getIsCameraVisible = (state) => stateRoot(state).recordingSetID !== null;

export const getRecordingSetID = (state) => stateRoot(state).recordingSetID;
