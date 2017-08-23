import {
    PRESENT_WORKOUT_EXPANDED,
    SAVE_WORKOUT_REP
} from 'app/ActionTypes';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';

export const presentExpanded = (setID) => ({
    type: PRESENT_WORKOUT_EXPANDED,
    setID: setID
});

export const removeRep = (setID, repIndex) => ({
    type: SAVE_WORKOUT_REP,
    setID: setID,
    repIndex: repIndex,
    removed: true
});

export const restoreRep = (setID, repIndex) => ({
    type: SAVE_WORKOUT_REP,
    setID: setID,
    repIndex: repIndex,
    removed: false
});

export const endSet = () => {
    return SetsActionCreators.endSet();
};