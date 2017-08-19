import {
    PRESENT_HISTORY_EXPANDED,
    LOADING_HISTORY,
    SAVE_HISTORY_REP
} from 'app/ActionTypes';

export const presentExpanded = (setID) => ({
    type: PRESENT_HISTORY_EXPANDED,
    setID: setID
});

export const finishLoading = () => ({
    type: LOADING_HISTORY,
    isLoading: false
});

export const removeRep = (setID, repIndex) => ({
    type: SAVE_HISTORY_REP,
    setID: setID,
    repIndex: repIndex,
    removed: true
});

export const restoreRep = (setID, repIndex) => ({
    type: SAVE_HISTORY_REP,
    setID: setID,
    repIndex: repIndex,
    removed: false
});
