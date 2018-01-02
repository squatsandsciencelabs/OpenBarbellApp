const stateRoot = (state) => state.sliders;

export const getSliderVelocity = (state) => stateRoot(state).velocity;

export const getSliderExercise = (state) => stateRoot(state).exercise;

export const getSliderDays = (state) => stateRoot(state).days;
