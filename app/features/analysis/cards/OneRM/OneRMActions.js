import {
    PRESENT_SELECT_EXERCISE,
    CHANGE_1RM_VELOCITY,
    CHANGE_1RM_DAYS_RANGE
} from 'app/ActionTypes';

export const presentSelectExercise = () => ({
    type: PRESENT_SELECT_EXERCISE
});

export const changeE1RMVelocity = (velocity) => ({
    type: CHANGE_1RM_VELOCITY,
    velocity: velocity
});

export const changeE1RMDays = (days) => ({
    type: CHANGE_1RM_DAYS_RANGE,
    days: days
});
