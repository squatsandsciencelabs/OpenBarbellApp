import {
    PRESENT_WORKOUT_EXERCISE,
    PRESENT_HISTORY_EXERCISE,
    PRESENT_WORKOUT_TAGS,
    PRESENT_HISTORY_TAGS,
    PRESENT_WORKOUT_VIDEO_RECORDER,
    PRESENT_HISTORY_VIDEO_RECORDER,
    PRESENT_WORKOUT_VIDEO_PLAYER,
    PRESENT_HISTORY_VIDEO_PLAYER,
    START_EDITING_WORKOUT_RPE,
    START_EDITING_HISTORY_RPE,
    START_EDITING_WORKOUT_WEIGHT,
    START_EDITING_HISTORY_WEIGHT,
    SAVE_WORKOUT_SET,
    SAVE_HISTORY_SET,
    END_EDITING_WORKOUT_RPE,
    END_EDITING_HISTORY_RPE,
    END_EDITING_WORKOUT_WEIGHT,
    END_EDITING_HISTORY_WEIGHT,
} from 'app/ActionTypes';

const defaultState = {
    editWorkoutExerciseStart: null,
    editHistoryExerciseStart: null,
    editWorkoutRPEStart: null,
    editHistoryRPEStart: null,
    editWorkoutWeightStart: null,
    editHistoryWeightStart: null,
    editWorkoutTagsStart: null,
    editHistoryTagsStart: null,
    workoutVideoRecorderStart: null,
    historyVideoRecorderStart: null,
    workoutVideoPlayerStart: null,
    historyVideoPlayerStart: null,
};

const DurationsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case PRESENT_WORKOUT_EXERCISE:
            return Object.assign({}, state, {
                editWorkoutExerciseStart: new Date()
            });
        case PRESENT_HISTORY_EXERCISE:
            return Object.assign({}, state, {
                editHistoryExerciseStart: new Date()
            });
        case START_EDITING_WORKOUT_RPE:
            return Object.assign({}, state, {
                editWorkoutRPEStart: new Date()
            });
        case START_EDITING_HISTORY_RPE:
            return Object.assign({}, state, {
                editHistoryRPEStart: new Date()
            });
        case START_EDITING_WORKOUT_WEIGHT: 
            return Object.assign({}, state, {
                editWorkoutWeightStart: new Date()
            });
        case START_EDITING_HISTORY_WEIGHT: 
            return Object.assign({}, state, {
                editHistoryWeightStart: new Date()
            });
        case PRESENT_WORKOUT_TAGS:
            return Object.assign({}, state, {
                editWorkoutTagsStart: new Date()
            });
        case PRESENT_HISTORY_TAGS:
            return Object.assign({}, state, {
                editHistoryTagsStart: new Date()
            });
        case PRESENT_WORKOUT_VIDEO_RECORDER:
            return Object.assign({}, state, {
                workoutVideoRecorderStart: new Date()
            });
        case PRESENT_HISTORY_VIDEO_RECORDER:
            return Object.assign({}, state, {
                historyVideoRecorderStart: new Date()
            });
        case PRESENT_WORKOUT_VIDEO_PLAYER: 
            return Object.assign({}, state, {
                workoutVideoPlayerStart: new Date()
            });
        case PRESENT_HISTORY_VIDEO_PLAYER:
            return Object.assign({}, state, {
                historyVideoPlayerStart: new Date()
            });
        default:
            return state;                                                                                                                                  
    }
};

export default DurationsReducer;