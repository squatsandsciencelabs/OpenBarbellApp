import {
    PRESENT_WORKOUT_EXERCISE,
    PRESENT_WORKOUT_TAGS,
    START_EDITING_WORKOUT_RPE,
    START_EDITING_WORKOUT_WEIGHT,
    PRESENT_WORKOUT_VIDEO_RECORDER,
    PRESENT_WORKOUT_VIDEO_PLAYER,
    END_EDITING_WORKOUT_RPE,
    END_EDITING_WORKOUT_WEIGHT,
} from 'app/ActionTypes';
import * as Analytics from 'app/utility/Analytics';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as DurationsSelectors from 'app/redux/selectors/DurationsSelectors';
import * as DurationCalculator from 'app/utility/transforms/DurationCalculator';

export const presentExercise = (setID, exercise, bias) => (dispatch, getState) => {
    var state = getState();

    Analytics.setCurrentScreen('edit_workout_exercise_name');

    editExerciseAnalytics(setID, exercise, state);

    dispatch({
        type: PRESENT_WORKOUT_EXERCISE,
        setID: setID,
        exercise: exercise,
        bias: bias
    });
};

export const editRPE = (setID) => (dispatch, getState) => {
    var state = getState();

    editRPEAnalytics(setID, state);

    dispatch({
        type: START_EDITING_WORKOUT_RPE
    });
};

export const editWeight = () => ({
    type: START_EDITING_WORKOUT_WEIGHT
});

export const dismissRPE = (setID) => (dispatch, getState) => {
    var state = getState();

    saveRPEAnalytics(setID, state);

    return {
        type: END_EDITING_WORKOUT_RPE
    }
};

export const dismissWeight = (setID) => (dispatch, getState) => {
    var state = getState();

    saveWeightAnalytics(setID, state);

    return {
        type: END_EDITING_WORKOUT_WEIGHT
    }
};

export const presentTags = (setID, tags) => (dispatch, getState) => {
    var state = getState();

    Analytics.setCurrentScreen('edit_workout_tags');

    editTagsAnalytics(setID, state);

    dispatch({
        type: PRESENT_WORKOUT_TAGS,
        setID: setID,
        tags: tags
    });
};

export const saveSet = (setID, exercise = null, weight = null, metric = null, rpe = null) => {    
    return SetsActionCreators.saveWorkoutSet(setID, exercise, weight, metric, rpe);
};

export const presentRecordVideo = (setID) => {
    Analytics.setCurrentScreen('workout_record_video');

    return {
        type: PRESENT_WORKOUT_VIDEO_RECORDER,
        setID: setID,
        isCommentary: false
    }
};

export const presentRecordCommentary = (setID) => {
    Analytics.setCurrentScreen('workout_record_video_log');

    return {
        type: PRESENT_WORKOUT_VIDEO_RECORDER,
        setID: setID,
        isCommentary: true
    }
};

export const presentWatchVideo = (setID, videoFileURL) => {
    Analytics.setCurrentScreen('workout_watch_video');

    return {
        type: PRESENT_WORKOUT_VIDEO_PLAYER,
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

const saveWeightAnalytics = (setID, state) => {
    let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);
    let startDate = DurationsSelectors.getEditWorkoutWeightStart(state);
    let duration = DurationCalculator.getDurationTime(startDate, new Date());  

    Analytics.logEventWithAppState('save_weight', {
        value: duration,
        duration: duration,
        is_working_set: is_working_set
    }, state);    
}

const saveRPEAnalytics = (setID, state) => {
    let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);
    let startDate = DurationsSelectors.getEditWorkoutRPEStart(state);
    let duration = DurationCalculator.getDurationTime(startDate, new Date());  

    Analytics.logEventWithAppState('save_rpe', {
        value: duration,
        duration: duration,
        is_working_set: is_working_set
    }, state);    
};

const editRPEAnalytics = (setID, state) => {
    let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);

    Analytics.logEventWithAppState('edit_rpe', {
        is_working_set: is_working_set
    }, state);       
};

const editTagsAnalytics = (setID, state) => {
    let is_working_set = SetsSelectors.getIsCurrentSet(state, setID);

    Analytics.logEventWithAppState('edit_tags', {
        is_working_set: is_working_set
    }, state);       
};
