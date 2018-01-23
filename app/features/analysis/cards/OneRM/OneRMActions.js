import {
    PRESENT_SELECT_EXERCISE,
    CHANGE_VELOCITY_SLIDER,
    CHANGE_1RM_DAYS_RANGE,
    PRESENT_INCLUDES_TAGS,
    PRESENT_EXCLUDES_TAGS,
    CALC_ONE_RM,
} from 'app/ActionTypes';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as OneRMCalculator from 'app/utility/transforms/OneRMCalculator';

export const presentSelectExercise = () => ({
    type: PRESENT_SELECT_EXERCISE
});

export const changeVelocitySlider = (velocity) => ({
    type: CHANGE_VELOCITY_SLIDER,
    velocity: velocity
});

export const changeE1RMDays = (days) => ({
    type: CHANGE_1RM_DAYS_RANGE,
    days: days
});

export const presentTagsToExclude = () => ({
    type: PRESENT_EXCLUDES_TAGS,
})

export const presentTagsToInclude = () => ({
    type: PRESENT_INCLUDES_TAGS,
});

export const calcE1rm = (data, velocity) => {
    const e1rm = OneRMCalculator.calc1rm(data, velocity);
    const confidence = OneRMCalculator.getConfidenceInterval(data);

    return {
        type: CALC_ONE_RM,
        e1rm: e1rm,
        e1RMVelocity: velocity,
        confidence: confidence,
    };
};
