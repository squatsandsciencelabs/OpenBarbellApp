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
import * as Analytics from 'app/utility/analytics/Analytics';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';

export const presentExercise = (setID, exercise, bias) => {
    Analytics.setCurrentScreen('edit_workout_exercise_name');

    return {
        type: PRESENT_WORKOUT_EXERCISE,
        setID: setID,
        exercise: exercise,
        bias: bias
    }
};

export const editRPE = () => ({
    type: START_EDITING_WORKOUT_RPE
});

export const editWeight = () => ({
    type: START_EDITING_WORKOUT_WEIGHT
});

export const dismissRPE = () => ({
    type: END_EDITING_WORKOUT_RPE
});

export const dismissWeight = () => ({
    type: END_EDITING_WORKOUT_WEIGHT
});

export const presentTags = (setID, tags) => {
    Analytics.setCurrentScreen('edit_workout_tags');

    return {
        type: PRESENT_WORKOUT_TAGS,
        setID: setID,
        tags: tags
    }
};

export const saveSet = (setID, exercise = null, weight = null, metric = null, rpe = null) => {
    Analytics.setCurrentScreen('workout');
    
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
