import {
    PRESENT_EDIT_1RM_SET,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as AnalysisActionCreators from 'app/redux/shared_actions/AnalysisActionCreators';

export const tappedSet = (setID) => (dispatch, getState) => {
    const state = getState();
    logEditSetAnalytics(state, setID);
    Analytics.setCurrentScreen('one_rm_edit_set');

    const set = SetsSelectors.getSet(state, setID);

    dispatch({
        type: PRESENT_EDIT_1RM_SET,
        setID: setID,
        workoutID: set.hasOwnProperty('workoutID') ? set.workoutID : null,
        origExerciseName: set.hasOwnProperty('exercise') ? set.exercise : null,
        origRPE: set.hasOwnProperty('rpe') ? set.rpe : null,
        origWeight: set.hasOwnProperty('weight') ? set.weight : null,
        origMetric: set.hasOwnProperty('metric') ? set.metric : null,
        origTags: set.hasOwnProperty('tags') ? set.tags : [],
        origDeletedFlag: set.hasOwnProperty('deleted') ? set.deleted : false,
    });
};

export const presentAlgorithm = () => AnalysisActionCreators.presentAlgorithm();

export const presentBestResults = () => AnalysisActionCreators.presentBestResults();

// ANALYTICS

const logEditSetAnalytics = (state, setID) => {
    Analytics.logEventWithAppState('one_rm_edit_set', {
        set_id: setID
    }, state);
};
