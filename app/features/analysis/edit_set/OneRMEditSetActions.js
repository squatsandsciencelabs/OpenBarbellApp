import {
    DISMISS_EDIT_1RM_SET,
} from 'app/configs+constants/ActionTypes';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as Analytics from 'app/services/Analytics';

export const removeRep = (setID, repIndex) => SetsActionCreators.removeHistoryRep(setID, repIndex);

export const restoreRep = (setID, repIndex) => SetsActionCreators.restoreHistoryRep(setID, repIndex);

export const dismissEditSet = () => (dispatch, getState) => {
    const state = getState();
    logCloseEditSetAnalytics(state);
    Analytics.setCurrentScreen('analysis');

    dispatch({
        type: DISMISS_EDIT_1RM_SET
    });
};

// ANALYTICS

const logCloseEditSetAnalytics = (state) => {
    // TODO: this has a bunch
    Analytics.logEventWithAppState('one_rm_close_edit_set', {
    }, state);
};
