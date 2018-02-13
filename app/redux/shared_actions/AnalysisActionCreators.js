import { 
    SAVE_1RM_EXERCISE,
    TEST_ONE_RM,
} from 'app/ActionTypes';

export const saveSelected1RMExercise = (exercise = 'Squat') => ({
    type: SAVE_1RM_EXERCISE,
    exercise: exercise,
});

// for debug use only
export const test1RM = () => ({
    type: TEST_ONE_RM,
});
