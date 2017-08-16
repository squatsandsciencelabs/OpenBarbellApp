import {
    UPDATE_SUGGESTIONS
} from 'app/ActionTypes';

export const updateSuggestions = () => (dispatch, getState) => {
    let state = getState();

    dispatch({
        type: UPDATE_SUGGESTIONS,
        historyData: state.sets.historyData
    });
};
