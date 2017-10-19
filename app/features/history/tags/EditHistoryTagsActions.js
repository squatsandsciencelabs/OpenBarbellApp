import {
    DISMISS_HISTORY_TAGS,
    SAVE_HISTORY_SET_TAGS
} from 'app/ActionTypes';
import * as Analytics from 'app/utility/Analytics';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';
import * as DurationCalculator from 'app/utility/transforms/DurationCalculator';

export const dismissTags = () => {
    Analytics.setCurrentScreen('history');
    
    return {
        type: DISMISS_HISTORY_TAGS
    }
};

export const saveTags = (setID, tags = []) => (dispatch, getState) => {
    var state = getState();

    saveTagsAnalytics(state);

    return {
        type: SAVE_HISTORY_SET_TAGS,
        setID: setID,
        tags: tags
    }
};

const saveTagsAnalytics = (state) => {
    // let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);
    let startDate = DurationsSelectors.getEditHistoryTagsStart(state);
    let duration = DurationCalculator.getDurationTime(startDate, new Date());  

    Analytics.logEventWithAppState('save_tags', {
        value: duration,
        duration: duration,
        // is_working_set: is_working_set
    }, state);    
};
