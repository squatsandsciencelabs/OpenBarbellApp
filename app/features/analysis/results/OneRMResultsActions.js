import {
    PRESENT_EDIT_1RM_SET,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const tappedSet = (setID, workoutID) => (dispatch, getState) => {
    const state = getState();
    logEditSetAnalytics(state, setID);
    Analytics.setCurrentScreen('one_rm_edit_set');

    dispatch({
        type: PRESENT_EDIT_1RM_SET,
        setID: setID,
        workoutID: workoutID,
    });
};

const logEditSetAnalytics = (state, setID) => {
    Analytics.logEventWithAppState('one_rm_edit_set', {
        set_id: setID
    }, state);
};
