import {
    COLLAPSE_WORKOUT_SET,
    EXPAND_WORKOUT_SET,
} from 'app/configs+constants/ActionTypes';

export const collapseCard = (setID) => ({
    type: COLLAPSE_WORKOUT_SET,
    setID: setID,
});

export const expandCard = (setID) => ({
    type: EXPAND_WORKOUT_SET,
    setID: setID,
});
