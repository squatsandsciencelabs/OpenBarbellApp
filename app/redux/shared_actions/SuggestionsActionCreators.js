import {
    UPDATE_TAG_SUGGESTIONS,
    UPDATE_EXERCISE_SUGGESTIONS
} from 'app/configs+constants/ActionTypes';

export const updateTagSuggestions = () => (dispatch, getState) => {
    const state = getState();
    
    dispatch({
        type: UPDATE_TAG_SUGGESTIONS,
        workoutData: state.sets.workoutData,
        historyData: state.sets.historyData
    });    
}

export const updateExerciseSuggestions = () => (dispatch, getState) => {
    const state = getState();
    
    dispatch({
        type: UPDATE_EXERCISE_SUGGESTIONS,
        workoutData: state.sets.workoutData,
        historyData: state.sets.historyData
    });
}
