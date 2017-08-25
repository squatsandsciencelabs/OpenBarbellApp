const stateRoot = (state) => state.workout;

export const getEditingExerciseName = (state) => stateRoot(state).editingExerciseName;

export const getEditingExerciseSetID = (state) => stateRoot(state).editingExerciseSetID;

export const getEditingExerciseBias = (state) => stateRoot(state).editingExerciseBias;

export const getIsRecording = (state) => stateRoot(state).isRecording;

export const getIsCameraVisible = (state) => stateRoot(state).videoSetID !== null;
