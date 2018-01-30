import { Alert } from 'react-native';
import {
    PRESENT_WORKOUT_EXPANDED,
    SAVE_WORKOUT_REP,
    COLLAPSE_WORKOUT_SET,
    EXPAND_WORKOUT_SET,
    DELETE_WORKOUT_SET,
} from 'app/ActionTypes';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as Analytics from 'app/services/Analytics';

export const collapseSet = (setID) => (dispatch, getState) => {
    dispatch({
        type: COLLAPSE_WORKOUT_SET,
        setID: setID,
    });
};

export const expandSet = (setID) => (dispatch, getState) => {
    dispatch({
        type: EXPAND_WORKOUT_SET,
        setID: setID,
    });
};

export const presentExpanded = (setID) => ({
    type: PRESENT_WORKOUT_EXPANDED,
    setID: setID,
});

export const deleteSet = (setID) => (dispatch) => {
    Alert.alert(
        'Are you sure?',
        "",
        [
          {text: 'Delete Set', style: 'destructive', onPress: () => dispatch({ type: DELETE_WORKOUT_SET, setID: setID })},
          {text: 'Cancel', style: 'cancel'},,
        ],
        { cancelable: false }
    );
};


export const removeRep = (setID, repIndex) => (dispatch, getState) => {
    const state = getState();
    logRemoveRepAnalytics(state, setID);

    dispatch({
        type: SAVE_WORKOUT_REP,
        setID: setID,
        repIndex: repIndex,
        removed: true
    });
};

export const restoreRep = (setID, repIndex) => (dispatch, getState) => {
    const state = getState();
    logRestoreRepAnalytics(state, setID);

    dispatch({
        type: SAVE_WORKOUT_REP,
        setID: setID,
        repIndex: repIndex,
        removed: false
    });
};

export const endSet = () => {
    return SetsActionCreators.endSet(true, false);
};

const logRemoveRepAnalytics = (state, setID) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('remove_rep', {
        is_working_set: is_working_set,
        is_history: false,
    }, state);
};

const logRestoreRepAnalytics = (state, setID) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('restore_rep', {
        is_working_set: is_working_set,
        is_history: false,
    }, state);
};
