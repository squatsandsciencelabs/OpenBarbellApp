// TODO: break up analysis into multiple reducers and selectors
// This has gotten too unwieldy
import _ from 'lodash';

import {
    CHANGE_VELOCITY_SLIDER,
    CHANGE_1RM_DAYS_RANGE,
    PRESENT_SELECT_EXERCISE,
    SAVE_1RM_EXERCISE,
    DISMISS_SELECT_EXERCISE,
    PRESENT_INCLUDES_TAGS,
    PRESENT_EXCLUDES_TAGS,
    ADD_INCLUDE_TAG,
    ADD_EXCLUDE_TAG,
    SAVE_INCLUDES_TAGS,
    SAVE_EXCLUDES_TAGS,
    DISMISS_INCLUDES_TAGS,
    DISMISS_EXCLUDES_TAGS,
    CALC_1RM,
    PRESENT_INFO_MODAL,
    SHOW_BEST_RESULTS_MODAL,
    DISMISS_INFO_MODAL,
    PRESENT_EDIT_1RM_SET,
    DISMISS_EDIT_1RM_SET,
    PRESENT_1RM_EXERCISE,
    DISMISS_1RM_EXERCISE,
    PRESENT_1RM_TAGS,
    DISMISS_1RM_TAGS,
    PRESENT_1RM_VIDEO_RECORDER,
    DISMISS_1RM_VIDEO_RECORDER,
    PRESENT_1RM_VIDEO_PLAYER,
    DISMISS_1RM_VIDEO_PLAYER,
    START_RECORDING_1RM,
    STOP_RECORDING_1RM,
    SAVE_WORKOUT_VIDEO,
    SAVE_HISTORY_VIDEO,
    DELETE_WORKOUT_VIDEO,
    DELETE_HISTORY_VIDEO,
    SAVE_WORKOUT_REP,
    SAVE_HISTORY_REP,
    EDIT_1RM_SET_WEIGHT,
    EDIT_1RM_SET_RPE,
    ANALYSIS_DRAGGED,
    CLEAR_E1RM_CALCS,
} from 'app/configs+constants/ActionTypes';

const defaultState = {
    // popups
    showInfoModal: false,
    isEditingExercise: false,
    isEditingIncludeTags: false,
    isEditingExcludeTags: false,

    // calculate
    velocitySlider: .01,
    exercise: 'squat',
    daysRange: 7,
    tagsToInclude: [],
    tagsToExclude: [],

    // results
    velocity: null,
    e1RM: null,
    r2: null,
    activeChartData: [],
    unusedChartData: [],
    errorChartData: [],
    regressionPoints: null,
    minX: null,
    maxX: null,
    maxY: null,
    isRegressionNegative: null,
    e1RMCalcs: [],

    // edit set
    // TODO: Since there's only one setID ever at any point, shouldn't need this many setIDs
    // it's currently just using the IDs to indicate if the modal is showing or not
    // leaving the setIDs in because when copy pasting, this is much easier
    setID: null,
    workoutID: null,
    editingExerciseName: '',
    editingExerciseSetID: null,
    editingTags: [],
    editingTagsSetID: null,
    recordingSetID: null,
    recordingVideoType: null,
    isRecording: false,
    isSavingVideo: false,    
    watchSetID: null,
    watchFileURL: null,

    // analytics
    origExerciseName: null,
    currentRPE: null, // hack to get around keyboard dismiss timing issues
    origRPE: null,
    currentWeight: null, // hack to get around keyboard dismiss timing issues
    origWeight: null,
    origMetric: null,
    origTags: [],
    origDeletedFlag: false,
    wasError: false,
    didUpdateReps: false,

    // scroll
    scroll: false, // used to scroll on calculate
    dragged: false, // hack to detect touch drag on the chart and prevent opening set as a result, aka it acts like touch canceled
};

const AnalysisReducer = (state = defaultState, action) => {
    switch (action.type) {
        // popups
        case PRESENT_INFO_MODAL:
            return {
                ...state,
                showInfoModal: true,
            };
        case DISMISS_INFO_MODAL:
            return {
                ...state,
                showInfoModal: false,
            };
        case PRESENT_SELECT_EXERCISE: 
            return Object.assign({}, state, {
                isEditingExercise: true,
            });
        case DISMISS_SELECT_EXERCISE:
            return Object.assign({}, state, {
                isEditingExercise: false,
            });
        case PRESENT_INCLUDES_TAGS:
            return {
                ...state,
                isEditingIncludeTags: true,
            };
        case DISMISS_INCLUDES_TAGS:
            return {
                ...state,
                isEditingIncludeTags: false,
            };
        case PRESENT_EXCLUDES_TAGS:
            return {
                ...state,
                isEditingExcludeTags: true,
            };
        case DISMISS_EXCLUDES_TAGS:
            return {
                ...state,
                isEditingExcludeTags: false,
            };

        // calculate
        case SAVE_1RM_EXERCISE:
            return Object.assign({}, state, {
                exercise: action.exercise,
            });
        case SAVE_INCLUDES_TAGS:
            return {
                ...state,
                tagsToInclude: action.tags,
            };
        case SAVE_EXCLUDES_TAGS:
            return {
                ...state,
                tagsToExclude: action.tags,
            };
        case CHANGE_VELOCITY_SLIDER:
            return {
                ...state,
                velocitySlider: Number(action.velocity.toFixed(2)),
            };
        case CHANGE_1RM_DAYS_RANGE: 
            return Object.assign({}, state, {
                daysRange: action.days,
            });

        // results
        case ANALYSIS_DRAGGED:
            return {
                ...state,
                dragged: !state.dragged,
            };
        case CALC_1RM:
            let e1RMCalcs = state.e1RMCalcs;
            let newCalc = action.e1RMCalc;
            
            // filter out existing exercise + tags combos
            let filteredCalcs = e1RMCalcs.filter((calc) => {
                return !compareByExerciseAndTags(calc, newCalc);
            });

            return {
                ...state,
                e1RM: action.e1RM,
                velocity: action.velocity,
                r2: action.r2,
                activeChartData: action.activeChartData,
                errorChartData: action.errorChartData,
                unusedChartData: action.unusedChartData,
                regressionPoints: action.regressionPoints,
                minX: action.minX,
                maxX: action.maxX,
                maxY: action.maxY,
                isRegressionNegative: action.isRegressionNegative,
                scroll: !state.scroll,
                e1RMCalcs: [ ...filteredCalcs, newCalc ],
            };
        case CLEAR_E1RM_CALCS:
            return {
                ...state,
                e1RMCalcs: [],
            }
        // edit
        case PRESENT_EDIT_1RM_SET:
            return {
                ...state,
                setID: action.setID,
                workoutID: action.workoutID,
                origExerciseName: action.origExerciseName,
                origRPE: action.origRPE,
                currentRPE: action.origRPE,
                origWeight: action.origWeight,
                currentWeight: action.origWeight,
                origMetric: action.origMetric,
                origTags: [...action.origTags],
                origDeletedFlag: action.origDeletedFlag,
                wasError: action.wasError,
                didUpdateReps: false,
            };
        case DISMISS_EDIT_1RM_SET:
            return {
                ...state,
                setID: null,
                workoutID: null,
                origExerciseName: null,
                origRPE: null,
                currentRPE: null,
                origWeight: null,
                currentWeight: null,
                origMetric: null,
                origTags: [],
                origDeletedFlag: false,
                wasError: false,
                didUpdateReps: false,
            };
        case PRESENT_1RM_EXERCISE:
            return Object.assign({}, state, {
                editingExerciseSetID: action.setID,
                editingExerciseName: action.exercise,
            });
        case PRESENT_1RM_TAGS:
            return Object.assign({}, state, {
                editingTagsSetID: action.setID,
                editingTags: action.tags,
            });
        case DISMISS_1RM_EXERCISE:
            return Object.assign({}, state, {
                editingExerciseSetID: null,
                editingExerciseName: '',
            });
        case DISMISS_1RM_TAGS:
            return Object.assign({}, state, {
                editingTagsSetID: null,
                editingTags: [],
            });
        case PRESENT_1RM_VIDEO_RECORDER:
            return Object.assign({}, state, {
                recordingSetID: action.setID,
                recordingVideoType: action.isCommentary ? 'commentary' : 'lift',
                isRecording: false,
                isSavingVideo: false,
            });
        case SAVE_WORKOUT_VIDEO: // workout sets will use save workout video
        case SAVE_HISTORY_VIDEO: // history sets will use save history video
        case DISMISS_1RM_VIDEO_RECORDER:
            return Object.assign({}, state, {
                recordingSetID: null,
                recordingVideoType: null,
                isRecording: false,
                isSavingVideo: false,
            });
        case START_RECORDING_1RM:
            return Object.assign({}, state, {
                isRecording: true,
            });
        case STOP_RECORDING_1RM:
            return Object.assign({}, state, {
                isRecording: false,
                isSavingVideo: true,
            });
        case PRESENT_1RM_VIDEO_PLAYER:
            return Object.assign({}, state, {
                watchSetID: action.setID,
                watchFileURL: action.videoFileURL,
            });
        case DISMISS_1RM_VIDEO_PLAYER:
        case DELETE_WORKOUT_VIDEO: // workout sets will use delete workout video
        case DELETE_HISTORY_VIDEO: // history sets will use delete history video
            return Object.assign({}, state, {
                watchSetID: null,
                watchFileURL: null
            });
        
        // analytics
        case SAVE_WORKOUT_REP:
        case SAVE_HISTORY_REP:
            return Object.assign({}, state, {
                didUpdateReps: true,
            });
        case EDIT_1RM_SET_WEIGHT:
            return Object.assign({}, state, {
                currentWeight: action.weight,
            });
        case EDIT_1RM_SET_RPE:
            return Object.assign({}, state, {
                currentRPE: action.rpe,
            });

        default: 
            return state;
    }
};

const compareByExerciseAndTags = (calc1, calc2) => {

    const areExercisesEqual = calc1.exercise === calc2.exercise;
    const areTagsToIncludeEqual = areArraysEqual(calc1.tags_to_include, calc2.tags_to_include);
    const areTagsToExcludeEqual = areArraysEqual(calc1.tags_to_exclude, calc2.tags_to_exclude);

    return areExercisesEqual && areTagsToIncludeEqual && areTagsToExcludeEqual;

}

const areArraysEqual = (array1, array2) => {
    if (!array1 || !array2 || array1.length !== array2.length) {
        return false;
    }
    
    return _.isEqual(array1.sort(), array2.sort());
}

export default AnalysisReducer;
