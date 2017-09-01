const stateRoot = (state) => state.workout;

export const getEditingExerciseName = (state) => stateRoot(state).editingExerciseName;

export const getEditingExerciseSetID = (state) => stateRoot(state).editingExerciseSetID;

export const getEditingExerciseBias = (state) => stateRoot(state).editingExerciseBias;

// video recorder / camera

export const getIsRecording = (state) => stateRoot(state).isRecording;

export const getRecordingVideoType = (state) => stateRoot(state).recordingVideoType;

export const getIsCameraVisible = (state) => stateRoot(state).recordingSetID !== null;

export const getRecordingSetID = (state) => stateRoot(state).recordingSetID;

export const getIsSavingVideo = (state) => stateRoot(state).isSavingVideo;

// video player

export const getWatchSetID = (state) => stateRoot(state).watchSetID;

export const getIsVideoPlayerVisible = (state) => stateRoot(state).watchSetID !== null;

export const getWatchFileURL = (state) => stateRoot(state).watchFileURL;
