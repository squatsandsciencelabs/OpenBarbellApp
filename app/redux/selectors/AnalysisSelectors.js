const stateRoot = (state) => state.analysis;

// popup state

export const getShowInfoModal = (state) => stateRoot(state).showInfoModal;

export const getIsEditingExercise = (state) => stateRoot(state).isEditingExercise;

export const getIsEditingIncludeTags = (state) => stateRoot(state).isEditingIncludeTags;

export const getIsEditingExcludeTags = (state) => stateRoot(state).isEditingExcludeTags;

// calculate

export const getExercise = (state) => stateRoot(state).exercise;

export const getTagsToInclude = (state) => stateRoot(state).tagsToInclude;

export const getTagsToExclude = (state) => stateRoot(state).tagsToExclude;

export const getVelocitySlider = (state) => stateRoot(state).velocitySlider;

export const getDaysRange = (state) => stateRoot(state).daysRange;

// results

// this is the velocity last used to calculate it, not the current velocity value
export const getAnalysisVelocity = (state) => stateRoot(state).velocity;

export const getE1RM = (state) => stateRoot(state).e1RM;

export const getR2 = (state) => stateRoot(state).r2;

export const getIsR2HighEnough = (state) => getR2(state) > 90; // TODO: make 90 a config

export const getActiveChartData = (state) => stateRoot(state).activeChartData;

export const getErrorChartData = (state) => stateRoot(state).errorChartData;

export const getUnusedChartData = (state) => stateRoot(state).unusedChartData;

export const getRegressionPoints = (state) => stateRoot(state).regressionPoints;

export const getSetID = (state) => stateRoot(state).setID;

export const getWorkoutID = (state) => stateRoot(state).workoutID;

// scroll

export const getScroll = (state) => stateRoot(state).scroll;
