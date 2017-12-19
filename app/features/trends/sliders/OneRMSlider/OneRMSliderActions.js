import {
    CHANGE_SLIDER_VELOCITY
} from 'app/ActionTypes';

export const changeSliderVelocity = (velocity) => ({
    type: CHANGE_SLIDER_VELOCITY,
    velocity: velocity
});
