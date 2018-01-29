const stateRoot = (state) => state.analysis;

export const getIsEditing1RMExercise = (state) => stateRoot(state).isEditing1RMExercise;

export const getAnalysisE1RMVelocity = (state) => stateRoot(state).e1RMVelocity;

export const getAnalysisE1RMExercise = (state) => stateRoot(state).e1RMExercise;

export const getAnalysisRange = (state) => stateRoot(state).e1RMDaysRange;

export const getIsEditingIncludeTags = (state) => stateRoot(state).isEditingIncludeTags;

export const getIsEditingExcludeTags = (state) => stateRoot(state).isEditingExcludeTags;

export const getTagsToInclude = (state) => stateRoot(state).tagsToInclude;

export const getTagsToExclude = (state) => stateRoot(state).tagsToExclude;

export const getCurrentE1rm = (state) => stateRoot(state).e1rm;

export const getCurrentConfidence = (state) => stateRoot(state).confidence;

export const getVelocitySlider = (state) => stateRoot(state).velocitySlider;

export const getChartData = (state) => stateRoot(state).chartData;

export const getRegLineData = (state) => stateRoot(state).regLineData;
