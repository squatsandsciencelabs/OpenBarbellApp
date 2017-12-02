import {
    COLLAPSE_WORKOUT_SET,
    EXPAND_WORKOUT_SET,
} from 'app/ActionTypes';

export const collapseCard = (setID) => ({
    type: COLLAPSE_WORKOUT_SET,
    setID: setID,
});

export const expandCard = (setID) => ({
    type: EXPAND_WORKOUT_SET,
    setID: setID,
});
