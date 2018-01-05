const stateRoot = (state) => state.analysis;

export const getisEditingExercise = (state) => stateRoot(state).isEditingExercise;

export const getAnalysisVelocity = (state) => stateRoot(state).velocity;

export const getAnalysisExercise = (state) => stateRoot(state).exercise;

export const getAnalysisRange = (state) => stateRoot(state).daysRange;
