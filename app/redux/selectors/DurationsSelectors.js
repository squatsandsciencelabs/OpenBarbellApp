import * as DurationCalculator from 'app/utility/DurationCalculator';

const stateRoot = (state) => state.durations

export const getEditWorkoutExerciseStart = (state) => stateRoot(state).editWorkoutExerciseStart;

export const getEditWorkoutExerciseDuration = (state) => DurationCalculator.getDurationBetween(getEditWorkoutExerciseStart(state), Date.now());

export const getEditHistoryExerciseStart = (state) => stateRoot(state).editHistoryExerciseStart;

export const getEditHistoryExerciseDuration = (state) => DurationCalculator.getDurationBetween(getEditHistoryExerciseStart(state), Date.now());

export const getEditWorkoutRPEStart = (state) => stateRoot(state).editWorkoutRPEStart;

export const getEditWorkoutRPEDuration = (state) => DurationCalculator.getDurationBetween(getEditWorkoutRPEStart(state), Date.now());

export const getEditHistoryRPEStart = (state) => stateRoot(state).editHistoryRPEStart;

export const getEditHistoryRPEDuration = (state) => DurationCalculator.getDurationBetween(getEditHistoryRPEStart(state), Date.now());

export const getEditWorkoutWeightStart = (state) => stateRoot(state).editWorkoutWeightStart;

export const getEditWorkoutWeightDuration = (state) => DurationCalculator.getDurationBetween(getEditWorkoutWeightStart(state), Date.now());

export const getEditHistoryWeightStart = (state) => stateRoot(state).editHistoryWeightStart;

export const getEditHistoryWeightDuration = (state) => DurationCalculator.getDurationBetween(getEditHistoryWeightStart(state), Date.now());

export const getEditWorkoutTagsStart = (state) => stateRoot(state).editWorkoutTagsStart; 

export const getEditWorkoutTagsDuration = (state) => DurationCalculator.getDurationBetween(getEditWorkoutTagsStart(state), Date.now());

export const getEditHistoryTagsStart = (state) => stateRoot(state).editHistoryTagsStart;

export const getEditHistoryTagsDuration = (state) => DurationCalculator.getDurationBetween(getEditHistoryTagsStart(state), Date.now());

export const getWorkoutVideoRecorderStart = (state) => stateRoot(state).workoutVideoRecorderStart;

export const getWorkoutVideoRecorderDuration = (state) => DurationCalculator.getDurationBetween(getWorkoutVideoRecorderStart(state), Date.now());

// history video recorder

export const getHistoryVideoRecorderStart = (state) => stateRoot(state).historyVideoRecorderStart;

export const getHistoryVideoRecorderDuration = (state) => DurationCalculator.getDurationBetween(getHistoryVideoRecorderStart(state), Date.now());

// workout video recorder

export const getWorkoutVideoPlayerStart = (state) => stateRoot(state).workoutVideoPlayerStart;

export const getWorkoutVideoPlayerDuration = (state) => DurationCalculator.getDurationBetween(getWorkoutVideoPlayerStart(state), Date.now());

// history video player

export const getHistoryVideoPlayerStart = (state) => stateRoot(state).historyVideoPlayerStart;

export const getHistoryVideoPlayerDuration = (state) => DurationCalculator.getDurationBetween(getHistoryVideoPlayerStart(state), Date.now());
