import {
    PRESENT_EDIT_ANALYSIS_SET,
} from 'app/configs+constants/ActionTypes';

export const tappedSet = (setID, workoutID) => {
    return {
        type: PRESENT_EDIT_ANALYSIS_SET,
        setID: setID,
        workoutID: workoutID,
    };
};
