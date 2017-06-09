// app/actions/SuggestionsActionCreators.js

import {
	UPDATE_EXERCISE_SUGGESTIONS_MODEL,
    EDIT_HISTORY_EXERCISE_NAME
} from '../ActionTypes';

export const updateExerciseSuggestionsModel = () => (dispatch, getState) => {
    let state = getState();

    dispatch({
        type: UPDATE_EXERCISE_SUGGESTIONS_MODEL,
        historyData: state.sets.historyData
    });
};

export const beginEditHistoryExerciseName = (isEditing) => ({
    type: EDIT_HISTORY_EXERCISE_NAME,
    isEditing: true
});

export const endEditHistoryExerciseName = (isEditing) => ({
    type: EDIT_HISTORY_EXERCISE_NAME,
    isEditing: false
});
