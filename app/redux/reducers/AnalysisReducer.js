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
    START_EDITING_1RM_RPE,
    START_EDITING_1RM_WEIGHT,
    END_EDITING_1RM_RPE,
    END_EDITING_1RM_WEIGHT,
    START_RECORDING_1RM,
    STOP_RECORDING_1RM,
    SAVE_WORKOUT_VIDEO,
    SAVE_HISTORY_VIDEO,
    DELETE_WORKOUT_VIDEO,
    DELETE_HISTORY_VIDEO,
} from 'app/configs+constants/ActionTypes';

const defaultState = {
    // popups
    showInfoModal: false,
    isEditingExercise: false,
    isEditingIncludeTags: false,
    isEditingExcludeTags: false,

    // calculate
    velocitySlider: .01,
    exercise: 'Squat',
    daysRange: 7,
    tagsToInclude: [],
    tagsToExclude: [],

    // results
    velocity: null,
    e1RM: null,
    r2: null,
    activeChartData: null,
    unusedChartData: null,
    errorChartData: null,
    regressionPoints: null,
    minX: null,
    maxX: null,
    maxY: null,
    isRegressionNegative: null,

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

    // scroll
    scroll: false,
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
        case CALC_1RM:
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
            };
        
        // edit
        case PRESENT_EDIT_1RM_SET:
            return {
                ...state,
                setID: action.setID,
                workoutID: action.workoutID,
            };
        case DISMISS_EDIT_1RM_SET:
            return {
                ...state,
                setID: null,
                workoutID: null,
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
        default: 
            return state;
    }
};

export default AnalysisReducer;
