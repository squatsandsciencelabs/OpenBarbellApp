import {
    PRESENT_HISTORY_EXERCISE,
    PRESENT_HISTORY_TAGS,
    PRESENT_HISTORY_VIDEO_RECORDER,
    PRESENT_HISTORY_VIDEO_PLAYER,
    START_EDITING_HISTORY_RPE,
    START_EDITING_HISTORY_WEIGHT,
    END_EDITING_HISTORY_RPE,
    END_EDITING_HISTORY_WEIGHT,    
} from 'app/ActionTypes';
import * as Analytics from 'app/utility/Analytics';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';
import * as DurationCalculator from 'app/utility/transforms/DurationCalculator';

export const presentExercise = (setID, exercise, bias) => (dispatch, getState) => {
    var state = getState();

    Analytics.setCurrentScreen('edit_history_exercise_name');

    editExerciseAnalytics(setID, exercise, state);

    dispatch({
        type: PRESENT_HISTORY_EXERCISE,
        setID: setID,
        exercise: exercise,
        bias: bias
    });
};

export const editRPE = () => ({
    type: START_EDITING_HISTORY_RPE
});

export const editWeight = () => ({
    type: START_EDITING_HISTORY_WEIGHT
});

export const dismissRPE = () => (dispatch, getState) => {
    var state = getState();

    saveRPEAnalytics(state);

    return {
        type: END_EDITING_HISTORY_RPE
    }
};

export const dismissWeight = () => (dispatch, getState) => {
    var state = getState();

    saveWeightAnalytics(state);

    return {
        type: END_EDITING_HISTORY_WEIGHT
    }
};
export const presentTags = (setID, tags) => {
    Analytics.setCurrentScreen('edit_history_tags');

    return {
        type: PRESENT_HISTORY_TAGS,
        setID: setID,
        tags: tags
    }
};

export const saveSet = (setID, exercise = null, weight = null, metric = null, rpe = null) => {
    return SetsActionCreators.saveHistorySet(setID, exercise, weight, metric, rpe);
};

export const presentRecordVideo = (setID) => {
    Analytics.setCurrentScreen('history_record_video');

    return {
        type: PRESENT_HISTORY_VIDEO_RECORDER,
        setID: setID,
        isCommentary: false
    }
};

export const presentRecordCommentary = (setID) => {
    Analytics.setCurrentScreen('history_record_video_log');

    return {
        type: PRESENT_HISTORY_VIDEO_RECORDER,
        setID: setID,
        isCommentary: true
    }
};

export const presentWatchVideo = (setID, videoFileURL) => {
    Analytics.setCurrentScreen('history_watch_video');

    return {
        type: PRESENT_HISTORY_VIDEO_PLAYER,
        setID: setID,
        videoFileURL: videoFileURL
    }
};

const editExerciseAnalytics = (setID, exercise, state) => {
    let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);

    Analytics.logEventWithAppState('edit_exercise_name', {
        is_working_set: is_working_set
    }, state);
};

const saveWeightAnalytics = (state) => {
    // let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);
    let startDate = DurationsSelectors.getEditHistoryWeightStart(state);
    let duration = DurationCalculator.getDurationTime(startDate, new Date());  

    Analytics.logEventWithAppState('save_weight', {
        value: duration,
        duration: duration,
        // is_working_set: is_working_set
    }, state);    
};

const saveRPEAnalytics = (state) => {
    // let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);
    let startDate = DurationsSelectors.getEditHistoryRPEStart(state);
    let duration = DurationCalculator.getDurationTime(startDate, new Date());  

    Analytics.logEventWithAppState('save_rpe', {
        value: duration,
        duration: duration,
        // is_working_set: is_working_set
    }, state);    
};
