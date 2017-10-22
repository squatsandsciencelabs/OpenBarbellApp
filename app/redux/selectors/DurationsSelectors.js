import * as DurationCalculator from 'app/utility/transforms/DurationCalculator';

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

// history video recorder

export const getHistoryVideoRecorderStart = (state) => stateRoot(state).historyVideoRecorderStart;

export const getHistoryVideoRecorderDuration = (state) => DurationCalculator.getDurationBetween(getHistoryVideoRecorderStart(state), new Date());

// workout video recorder

export const getWorkoutVideoPlayerStart = (state) => stateRoot(state).workoutWatchVideoStart;

// history video player

export const getHistoryVideoPlayerStart = (state) => stateRoot(state).historyWatchVideoStart;





