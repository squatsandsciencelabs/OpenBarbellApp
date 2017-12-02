import {
    COLLAPSE_HISTORY_SET,
    EXPAND_HISTORY_SET,
} from 'app/ActionTypes';

export const collapseCard = (setID) => ({
    type: COLLAPSE_HISTORY_SET,
    setID: setID,
});

export const expandCard = (setID) => ({
    type: EXPAND_HISTORY_SET,
    setID: setID,
});
