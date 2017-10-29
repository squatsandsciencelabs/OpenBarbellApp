import {
    DISMISS_WORKOUT_TAGS,
    SAVE_WORKOUT_SET_TAGS,
    REMOVE_WORKOUT_TAG
} from 'app/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';

export const dismissTags = () => {
    Analytics.setCurrentScreen('workout');
    
    return {
        type: DISMISS_WORKOUT_TAGS
    };
};

export const cancelTags = () => (dispatch, getState) => {
    const state = getState();
    Analytics.setCurrentScreen('workout');
    logCancelEditTagsAnalytics(state);

    dispatch({
        type: DISMISS_WORKOUT_TAGS
    });
};

export const saveTags = (setID, tags = []) => (dispatch, getState) => {
    const state = getState();
    logSaveTagsAnalytics(state);
    dispatch({
        type: SAVE_WORKOUT_SET_TAGS,
        setID: setID,
        tags: tags
    });
};

export const tappedPill = (setID) => (dispatch, getState) => {
    const state = getState();
    logRemovedTagAnalytics(state);
    dispatch({
        type: REMOVE_WORKOUT_TAG,
    });
};

const logSaveTagsAnalytics = (state) => {
    const duration = DurationsSelectors.getEditWorkoutTagsDuration(state);

    Analytics.logEventWithAppState('save_tags', {
        value: duration,
        duration: duration,
    }, state);    
};

const logCancelEditTagsAnalytics = (state) => {
    const duration = DurationsSelectors.getEditWorkoutTagsDuration(state);

    Analytics.logEventWithAppState('cancel_edit_tags', {
        value: duration,
        duration: duration
    }, state);
};

const logRemovedTagAnalytics = (state) => {
    Analytics.logEventWithAppState('remove_tag', {
    }, state);
};
