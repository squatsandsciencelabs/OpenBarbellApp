import { 
	SAVE_SELECTED_EXERCISE
} from 'app/ActionTypes';

export const saveSelectedExercise = (exercise = 'Squat') => ({
    type: SAVE_SELECTED_EXERCISE,
    exercise: exercise,
});
