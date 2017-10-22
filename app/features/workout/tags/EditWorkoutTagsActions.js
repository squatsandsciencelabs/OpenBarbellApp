import {
    DISMISS_WORKOUT_TAGS,
    SAVE_WORKOUT_SET_TAGS
} from 'app/ActionTypes';
import * as Analytics from 'app/utility/Analytics';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';
import * as DurationCalculator from 'app/utility/transforms/DurationCalculator';

export const dismissTags = () => {
    Analytics.setCurrentScreen('workout');
    
    return {
        type: DISMISS_WORKOUT_TAGS
    };
};

export const cancelTags = () => (dispatch, getState) => {
    var state = getState();

    Analytics.setCurrentScreen('workout');

    cancelTagsAnalytics(state);

    dispatch({
        type: DISMISS_WORKOUT_TAGS
    });
};

export const saveTags = (setID, tags = []) => (dispatch, getState) => {
    var state = getState();

    saveTagsAnalytics(state);

    dispatch({
        type: SAVE_WORKOUT_SET_TAGS,
        setID: setID,
        tags: tags
    });
};

const saveTagsAnalytics = (state) => {
    let startDate = DurationsSelectors.getEditWorkoutTagsStart(state);
    let duration = DurationCalculator.getDurationBetween(startDate, new Date());  

    Analytics.logEventWithAppState('save_tags', {
        value: duration,
        duration: duration,
    }, state);    
};

const cancelTagsAnalytics = (state) => {
    let startDate = DurationsSelectors.getEditWorkoutTagsStart(state);
    let duration = DurationCalculator.getDurationBetween(startDate, new Date());  

    Analytics.logEventWithAppState('cancel_edit_tags', {
        value: duration,
        duration: duration
    }, state);
};
