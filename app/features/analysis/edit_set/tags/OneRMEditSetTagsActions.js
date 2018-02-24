import {
    DISMISS_1RM_TAGS,
    SAVE_WORKOUT_SET_TAGS,
    SAVE_HISTORY_SET_TAGS,
    REMOVE_1RM_TAG,
    ADD_1RM_TAG,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

export const dismissTags = () => {
    Analytics.setCurrentScreen('one_rm_edit_set');
    
    return {
        type: DISMISS_1RM_TAGS,
    };
};

export const cancelTags = (setID) => (dispatch, getState) => {
    const state = getState();
    Analytics.setCurrentScreen('one_rm_edit_set');
    logCancelEditTagsAnalytics(state, setID);

    dispatch({
        type: DISMISS_1RM_TAGS,
    });
};

export const saveTags = (setID, tags = []) => (dispatch, getState) => {
    const state = getState();
    logSaveTagsAnalytics(state, setID);

    if (SetsSelectors.getIsWorkoutSet(state, setID)) {
        dispatch({
            type: SAVE_WORKOUT_SET_TAGS,
            setID: setID,
            tags: tags,
        });
    } else {
        dispatch({
            type: SAVE_HISTORY_SET_TAGS,
            setID: setID,
            tags: tags,
        });
    }
};

export const tappedPill = (setID) => (dispatch, getState) => {
    const state = getState();
    logRemovedTagAnalytics(state, setID);
    dispatch({
        type: REMOVE_1RM_TAG,
    });
};

export const addPill = (setID) => (dispatch, getState) => {
    const state = getState();
    logAddTagAnalytics(state, setID);
    dispatch({
        type: ADD_1RM_TAG,
    });
};

const logSaveTagsAnalytics = (state, setID) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('save_tags', {
        is_working_set: is_working_set,
    }, state);
};

const logCancelEditTagsAnalytics = (state, setID) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('cancel_edit_tags', {
        is_working_set: is_working_set,
    }, state);
};

const logRemovedTagAnalytics = (state, setID) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('remove_tag', {
        is_working_set: is_working_set,
    }, state);
};

const logAddTagAnalytics = (state, setID) => {
    const is_working_set = SetsSelectors.getIsWorkingSet(state, setID);
    
    Analytics.logEventWithAppState('add_tag', {
        is_working_set: is_working_set,
    }, state);
};
