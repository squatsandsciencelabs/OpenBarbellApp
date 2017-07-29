import {
    PRESENT_HISTORY_EXPANDED,
    LOADING_HISTORY,
    SAVE_HISTORY_REP
} from 'app/ActionTypes';
import * as ApiActionCreators from 'app/redux/shared_actions/ApiActionCreators';

export const presentExpanded = (setID) => ({
    type: PRESENT_HISTORY_EXPANDED,
    setID: setID
});

export const finishLoading = () => ({
    type: LOADING_HISTORY,
    isLoading: false
});

export const removeRep = (setID, repIndex) => (dispatch) => {
    dispatch({
        type: SAVE_HISTORY_REP,
        setID: setID,
        repIndex: repIndex,
        removed: true
    });
    dispatch(ApiActionCreators.syncData());
};

export const restoreRep = (setID, repIndex) => (dispatch) => {
    dispatch({
        type: SAVE_HISTORY_REP,
        setID: setID,
        repIndex: repIndex,
        removed: false
    });
    dispatch(ApiActionCreators.syncData());
};
