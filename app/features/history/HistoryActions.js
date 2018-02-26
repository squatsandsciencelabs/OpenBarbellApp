import {
    LOADING_HISTORY,
    COLLAPSE_HISTORY_SET,
    EXPAND_HISTORY_SET,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';

export const collapseSet = (setID) => (dispatch, getState) => {
    dispatch({
        type: COLLAPSE_HISTORY_SET,
        setID: setID,
    });
};

export const expandSet = (setID) => (dispatch, getState) => {
    dispatch({
        type: EXPAND_HISTORY_SET,
        setID: setID,
    });
};

export const deleteSet = (setID) => SetsActionCreators.deleteHistorySet(setID);

export const restoreSet = (setID) => SetsActionCreators.restoreHistorySet(setID);

export const finishLoading = () => ({
    type: LOADING_HISTORY,
    isLoading: false
});

export const removeRep = (setID, repIndex) => SetsActionCreators.removeHistoryRep(setID, repIndex);

export const restoreRep = (setID, repIndex) => SetsActionCreators.restoreHistoryRep(setID, repIndex);
