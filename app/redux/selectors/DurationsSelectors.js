const stateRoot = (state) => state.durations

export const getEditWorkoutExerciseStart = (state) => stateRoot(state).editWorkoutExerciseStart;

export const getEditHistoryExerciseStart = (state) => stateRoot(state).editHistoryExerciseStart;

export const getEditWorkoutRPEStart = (state) => stateRoot(state).editWorkoutRPEStart;

export const getEditHistoryRPEStart = (state) => stateRoot(state).editHistoryRPEStart;

export const getEditWorkoutWeightStart = (state) => stateRoot(state).editWorkoutWeightStart;

export const getEditHistoryWeightStart = (state) => stateRoot(state).editHistoryWeightStart;

export const getEditWorkoutTagsStart = (state) => stateRoot(state).editWorkoutTagsStart; 

export const getEditHistoryTagsStart = (state) => stateRoot(state).editHistoryTagsStart;

export const getWorkoutVideoRecorderStart = (state) => stateRoot(state).workoutVideoRecorderStart;

export const getHistoryVideoRecorderStart = (state) => stateRoot(state).historyVideoRecorderStart;

export const getWorkoutWatchVideoStart = (state) => stateRoot(state).workoutWatchVideoStart;

export const getHistoryWatchVideoStart = (state) => stateRoot(state).historyWatchVideoStart;
