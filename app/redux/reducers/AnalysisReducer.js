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
    CALC_ONE_RM,
    PRESENT_INFO_MODAL,
    SHOW_BEST_RESULTS_MODAL,
    DISMISS_INFO_MODAL,
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
        case CALC_ONE_RM:
            return {
                ...state,
                e1RM: action.e1RM,
                velocity: action.velocity,
                r2: action.r2,
                activeChartData: action.activeChartData,
                errorChartData: action.errorChartData,
                unusedChartData: action.unusedChartData,
                regressionPoints: action.regressionPoints,
                scroll: !state.scroll,
            };

        default: 
            return state;
    }
};

export default AnalysisReducer;
