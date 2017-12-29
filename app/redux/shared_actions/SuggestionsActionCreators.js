import {
    UPDATE_TAG_SUGGESTIONS,
    UPDATE_EXERCISE_SUGGESTIONS
} from 'app/ActionTypes';

export const updateCommentSuggestions = () => (dispatch, getState) => {
    let state = getState();
    
    dispatch({
        type: UPDATE_TAG_SUGGESTIONS,
        workoutData: state.sets.workoutData,
        historyData: state.sets.historyData
    });    
}

export const updateExerciseSuggestions = () => (dispatch, getState) => {
    let state = getState();
    
    dispatch({
        type: UPDATE_EXERCISE_SUGGESTIONS,
        workoutData: state.sets.workoutData,
        historyData: state.sets.historyData
    });
}
