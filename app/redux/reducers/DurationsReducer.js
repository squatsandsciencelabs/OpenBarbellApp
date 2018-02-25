// TODO: consider if should move these back into the reducers for each screen
// OR consider if there should be an alt paradigm of reducers, for example a navigationreducer / reducers by data type theme

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
    END_EDITING_WORKOUT_RPE,
    END_EDITING_HISTORY_RPE,
    END_EDITING_WORKOUT_WEIGHT,
    END_EDITING_HISTORY_WEIGHT,
} from 'app/configs+constants/ActionTypes';

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
                editWorkoutExerciseStart: Date.now()
            });
        case PRESENT_HISTORY_EXERCISE:
            return Object.assign({}, state, {
                editHistoryExerciseStart: Date.now()
            });
        case START_EDITING_WORKOUT_RPE:
            return Object.assign({}, state, {
                editWorkoutRPEStart: Date.now()
            });
        case START_EDITING_HISTORY_RPE:
            return Object.assign({}, state, {
                editHistoryRPEStart: Date.now()
            });
        case START_EDITING_WORKOUT_WEIGHT: 
            return Object.assign({}, state, {
                editWorkoutWeightStart: Date.now()
            });
        case START_EDITING_HISTORY_WEIGHT: 
            return Object.assign({}, state, {
                editHistoryWeightStart: Date.now()
            });
        case PRESENT_WORKOUT_TAGS:
            return Object.assign({}, state, {
                editWorkoutTagsStart: Date.now()
            });
        case PRESENT_HISTORY_TAGS:
            return Object.assign({}, state, {
                editHistoryTagsStart: Date.now()
            });
        case PRESENT_WORKOUT_VIDEO_RECORDER:
            return Object.assign({}, state, {
                workoutVideoRecorderStart: Date.now()
            });
        case PRESENT_HISTORY_VIDEO_RECORDER:
            return Object.assign({}, state, {
                historyVideoRecorderStart: Date.now()
            });
        case PRESENT_WORKOUT_VIDEO_PLAYER: 
            return Object.assign({}, state, {
                workoutVideoPlayerStart: Date.now()
            });
        case PRESENT_HISTORY_VIDEO_PLAYER:
            return Object.assign({}, state, {
                historyVideoPlayerStart: Date.now()
            });
        default:
            return state;                                                                                                                                  
    }
};

export default DurationsReducer;
