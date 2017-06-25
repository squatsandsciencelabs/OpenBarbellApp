// app/actions/SuggestionsActionCreators.js

import {
	UPDATE_EXERCISE_SUGGESTIONS_MODEL,
    UPDATE_TAG_SUGGESTIONS_MODEL,
} from '../ActionTypes';

export const updateExerciseSuggestionsModel = () => (dispatch, getState) => {
    let state = getState();

    dispatch({
        type: UPDATE_EXERCISE_SUGGESTIONS_MODEL,
        historyData: state.sets.historyData
    });
};

export const updateTagsSuggestionsModel = () => (dispatch, getState) => {
    let state = getState();

    dispatch({
        type: UPDATE_TAG_SUGGESTIONS_MODEL,
        historyData: state.sets.historyData
    });
};
