const stateRoot = (state) => state.workout;

export const getIsEditing = (state) => stateRoot(state).isEditing;

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

// end set timer

export const getProjectedEndSetTime = (state) => stateRoot(state).projectedEndSetTime;

export const getTimerRemaining = (state) => stateRoot(state).timerRemaining;

export const getTimerDuration = (state) => stateRoot(state).timerDuration;

export const getTimerStatus = (state) => stateRoot(state).timerStatus;

// removed/restored counters

export const getRemovedCounter = (state) => stateRoot(state).removedCounter;

export const getRestoredCounter = (state) => stateRoot(state).restoredCounter;

// history viewed 

export const getHistoryViewedCounter = (state) => stateRoot(state).historyViewedCounter;