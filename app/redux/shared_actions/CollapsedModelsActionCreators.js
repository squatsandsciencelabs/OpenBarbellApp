import {
    SHOW_COLLAPSED_VIEW,
    CLOSE_COLLAPSED_VIEW
} from 'app/ActionTypes';

export const collapseCard = (setID) => {
    return {
        type: SHOW_COLLAPSED_VIEW,
        setID: setID,
    };
};

export const closeCollapsedCard = (setID) => {
    return {
        type: CLOSE_COLLAPSED_VIEW,
        setID: setID,
    }
};
