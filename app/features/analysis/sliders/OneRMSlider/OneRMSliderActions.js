import {
    CHANGE_SLIDER_VELOCITY,
    CHANGE_SLIDER_DAYS
} from 'app/ActionTypes';

export const changeSliderVelocity = (velocity) => ({
    type: CHANGE_SLIDER_VELOCITY,
    velocity: velocity
});

export const changeSliderDays = (days) => ({
    type: CHANGE_SLIDER_DAYS,
    days: days
});
