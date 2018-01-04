import {
    PRESENT_SELECT_EXERCISE,
    CHANGE_SLIDER_VELOCITY,
    CHANGE_SLIDER_DAYS
} from 'app/ActionTypes';

export const presentSelectExercise = () => ({
    type: PRESENT_SELECT_EXERCISE
});

export const changeSliderVelocity = (velocity) => ({
    type: CHANGE_SLIDER_VELOCITY,
    velocity: velocity
});

export const changeSliderDays = (days) => ({
    type: CHANGE_SLIDER_DAYS,
    days: days
});
