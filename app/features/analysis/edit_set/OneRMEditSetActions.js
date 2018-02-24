import {
    DISMISS_EDIT_1RM_SET,
} from 'app/configs+constants/ActionTypes';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';

export const removeRep = (setID, repIndex) => SetsActionCreators.removeHistoryRep(setID, repIndex);

export const restoreRep = (setID, repIndex) => SetsActionCreators.restoreHistoryRep(setID, repIndex);

export const dismissEditSet = () => {
    // TODO: analytics

    return {
        type: DISMISS_EDIT_1RM_SET
    };
};
