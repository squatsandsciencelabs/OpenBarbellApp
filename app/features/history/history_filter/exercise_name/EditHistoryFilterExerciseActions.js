import { DISMISS_HISTORY_FILTER_EXERCISE, SAVE_HISTORY_FILTER_EXERCISE } from 'app/configs+constants/ActionTypes';

export const dismissExercise = () => ({
    type: DISMISS_HISTORY_FILTER_EXERCISE
});

export const cancelExercise = () => ({
    type: DISMISS_HISTORY_FILTER_EXERCISE
});

export const saveExerciseName = (setID = null, exercise) => ({
    type: SAVE_HISTORY_FILTER_EXERCISE,
    exercise: exercise
});
