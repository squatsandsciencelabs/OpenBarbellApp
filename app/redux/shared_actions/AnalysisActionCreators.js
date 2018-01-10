import { 
	SAVE_1RM_EXERCISE
} from 'app/ActionTypes';

export const saveSelected1RMExercise = (exercise = 'Squat') => ({
    type: SAVE_1RM_EXERCISE,
    exercise: exercise,
});
