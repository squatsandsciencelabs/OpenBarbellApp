import {
    PRESENT_EDIT_1RM_SET,
} from 'app/configs+constants/ActionTypes';

export const tappedSet = (setID, workoutID) => {
    return {
        type: PRESENT_EDIT_1RM_SET,
        setID: setID,
        workoutID: workoutID,
    };
};
