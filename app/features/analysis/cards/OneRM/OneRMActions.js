import {
    PRESENT_SELECT_EXERCISE,
    CHANGE_1RM_VELOCITY,
    CHANGE_1RM_DAYS_RANGE,
    PRESENT_INCLUDES_TAGS,
    PRESENT_EXCLUDES_TAGS,
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
    days: Math.abs(days)
});

export const presentTagsToExclude = () => ({
    type: PRESENT_EXCLUDES_TAGS,
})

export const presentTagsToInclude = () => ({
    type: PRESENT_INCLUDES_TAGS,
});
