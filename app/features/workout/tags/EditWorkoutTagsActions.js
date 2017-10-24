import {
    DISMISS_WORKOUT_TAGS,
    SAVE_WORKOUT_SET_TAGS
} from 'app/ActionTypes';
import * as Analytics from 'app/utility/Analytics';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';

export const dismissTags = () => {
    Analytics.setCurrentScreen('workout');
    
    return {
        type: DISMISS_WORKOUT_TAGS
    };
};

export const cancelTags = () => (dispatch, getState) => {
    var state = getState();

    Analytics.setCurrentScreen('workout');

    logCancelEditTagsAnalytics(state);

    dispatch({
        type: DISMISS_WORKOUT_TAGS
    });
};

export const saveTags = (setID, tags = []) => (dispatch, getState) => {
    var state = getState();

    logSaveTagsAnalytics(state);

    dispatch({
        type: SAVE_WORKOUT_SET_TAGS,
        setID: setID,
        tags: tags
    });
};

const logSaveTagsAnalytics = (state) => {
    let startDate = DurationsSelectors.getEditWorkoutTagsStart(state);
    let duration = DurationsSelectors.getDurationBetween(startDate, new Date());  

    Analytics.logEventWithAppState('save_tags', {
        value: duration,
        duration: duration,
    }, state);    
};

const logCancelEditTagsAnalytics = (state) => {
    let startDate = DurationsSelectors.getEditWorkoutTagsStart(state);
    let duration = DurationsSelectors.getDurationBetween(startDate, new Date());  

    Analytics.logEventWithAppState('cancel_edit_tags', {
        value: duration,
        duration: duration
    }, state);
};
