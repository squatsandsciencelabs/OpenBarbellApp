import {
    PRESENT_WORKOUT_EXPANDED,
    SAVE_WORKOUT_REP
} from 'app/ActionTypes';
import * as ApiActionCreators from 'app/redux/shared_actions/ApiActionCreators';
import * as SetActionCreators from 'app/redux/shared_actions/SetActionCreators';
import * as WorkoutActionCreators from 'app/redux/shared_actions/WorkoutActionCreators';

export const presentExpanded = (setID) => ({
    type: PRESENT_WORKOUT_EXPANDED,
    setID: setID
});

export const removeRep = (setID, repIndex) => (dispatch) => {
    dispatch({
        type: SAVE_WORKOUT_REP,
        setID: setID,
        repIndex: repIndex,
        removed: true
    });
    dispatch(ApiActionCreators.syncData());
};

export const restoreRep = (setID, repIndex) => (dispatch) => {
    dispatch({
        type: SAVE_WORKOUT_REP,
        setID: setID,
        repIndex: repIndex,
        removed: false
    });
    dispatch(ApiActionCreators.syncData());
};

export const endWorkout = () => {
    return WorkoutActionCreators.endWorkout();
};

export const endSet = () => {
    return SetActionCreators.endSet();
};