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

export const presentExercise = (setID, exercise) => {
    Analytics.setCurrentScreen('edit_history_exercise_name');

    return {
        type: PRESENT_HISTORY_EXERCISE,
        setID: setID,
        exercise: exercise
    }
};

export const editRPE = () => ({
    type: START_EDITING_HISTORY_RPE
});

export const editWeight = () => ({
    type: START_EDITING_HISTORY_WEIGHT
});

export const dismissRPE = () => ({
    type: END_EDITING_HISTORY_RPE
});

export const dismissWeight = () => ({
    type: END_EDITING_HISTORY_WEIGHT
});

export const presentTags = (setID, tags) => {
    Analytics.setCurrentScreen('edit_history_tags');

    return {
        type: PRESENT_HISTORY_TAGS,
        setID: setID,
        tags: tags
    }
};

export const saveSet = (setID, exercise = null, weight = null, metric = null, rpe = null) => {
    Analytics.setCurrentScreen('history');
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
