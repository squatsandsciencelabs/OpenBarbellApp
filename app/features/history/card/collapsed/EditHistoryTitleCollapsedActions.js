import {
    EXPAND_HISTORY_SET,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const tapExpand = (setID) => (dispatch, getState) => {
    // TODO: analytics

    dispatch({
        type: EXPAND_HISTORY_SET,
        setID: setID,
    });
};
