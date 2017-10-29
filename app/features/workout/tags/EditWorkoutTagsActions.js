import {
    DISMISS_WORKOUT_TAGS,
    SAVE_WORKOUT_SET_TAGS,
    REMOVE_WORKOUT_TAG,
    ADD_WORKOUT_TAG,
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

export const dismissTags = () => {
    Analytics.setCurrentScreen('workout');
    
    return {
        type: DISMISS_WORKOUT_TAGS
    };
};

export const cancelTags = (setID) => (dispatch, getState) => {
    const state = getState();
    Analytics.setCurrentScreen('workout');
    logCancelEditTagsAnalytics(state, setID);

    dispatch({
        type: DISMISS_WORKOUT_TAGS
    });
};

export const saveTags = (setID, tags = []) => (dispatch, getState) => {
    const state = getState();
    logSaveTagsAnalytics(state, setID);
    dispatch({
        type: SAVE_WORKOUT_SET_TAGS,
        setID: setID,
        tags: tags
    });
};

export const tappedPill = (setID) => (dispatch, getState) => {
    const state = getState();
    logRemovedTagAnalytics(state, setID);
    dispatch({
        type: REMOVE_WORKOUT_TAG,
    });
};

export const addPill = (setID) => (dispatch, getState) => {
    const state = getState();
    logAddTagAnalytics(state, setID);
    dispatch({
        type: ADD_WORKOUT_TAG,
    });
};

const logSaveTagsAnalytics = (state, setID) => {
    let is_working_set = SetsSelectors.getIsWorkingSet(state, setID);
    const duration = DurationsSelectors.getEditWorkoutTagsDuration(state);

    Analytics.logEventWithAppState('save_tags', {
        value: duration,
        duration: duration,
        is_working_set: is_working_set,
    }, state);    
};

const logCancelEditTagsAnalytics = (state, setID) => {
    let is_working_set = SetsSelectors.getIsWorkingSet(state, setID);
    const duration = DurationsSelectors.getEditWorkoutTagsDuration(state);

    Analytics.logEventWithAppState('cancel_edit_tags', {
        value: duration,
        duration: duration,
        is_working_set: is_working_set,
    }, state);
};

const logRemovedTagAnalytics = (state, setID) => {
    let is_working_set = SetsSelectors.getIsWorkingSet(state, setID);

    Analytics.logEventWithAppState('remove_tag', {
        is_working_set: is_working_set,
    }, state);
};

const logAddTagAnalytics = (state, setID) => {
    let is_working_set = SetsSelectors.getIsWorkingSet(state, setID);
    
    Analytics.logEventWithAppState('add_tag', {
        is_working_set: is_working_set,
    }, state);
};
