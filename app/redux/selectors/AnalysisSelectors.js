const stateRoot = (state) => state.analysis;

export const getAnalysisVelocity = (state) => stateRoot(state).velocity;

export const getAnalysisExercise = (state) => stateRoot(state).exercise;

export const getAnalysisDays = (state) => stateRoot(state).days;

export const getisEditingExercise = (state) => stateRoot(state).isEditingExercise;
