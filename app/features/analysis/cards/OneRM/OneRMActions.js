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
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

export const presentSelectExercise = () => ({
    type: PRESENT_SELECT_EXERCISE,
});

export const changeVelocitySlider = (velocity) => ({
    type: CHANGE_VELOCITY_SLIDER,
    velocity: velocity
});

export const changeE1RMDays = (days) => ({
    type: CHANGE_1RM_DAYS_RANGE,
    days: Math.abs(days),
});

export const presentTagsToExclude = () => ({
    type: PRESENT_EXCLUDES_TAGS,
})

export const presentTagsToInclude = () => ({
    type: PRESENT_INCLUDES_TAGS,
});

export const calcE1rm = () => (dispatch, getState) => {
    const state = getState();
    const exercise = AnalysisSelectors.getAnalysisE1RMExercise(state);
    const velocity = AnalysisSelectors.getVelocitySlider(state);
    const exerciseData = SetsSelectors.getExerciseData(state, exercise);
    const chartData = SetsSelectors.getChartPoints(state, exercise);
    
    // Test Data Points that result in 91% confidence
    // const exerciseData = [
    //     [255, 0.48], 
    //     [275, 0.31], 
    //     [285, 0.30], 
    //     [295, 0.28], 
    //     [300, 0.26], 
    //     [310, 0.22], 
    //     [320, 0.19]
    // ];

    // const chartData = [
    //     {setID: 'a', x: 255, y: 0.4408}, 
    //     {setID: 'b', x: 275, y: 0.3588}, 
    //     {setID: 'c', x: 285, y: 0.3178}, 
    //     {setID: 'd', x: 295, y: 0.2768}, 
    //     {setID: 'e', x: 300, y: 0.2563}, 
    //     {setID: 'f', x: 310, y: 0.2153}, 
    //     {setID: 'g', x: 320, y: 0.1743}
    // ];
    
    const e1rm = OneRMCalculator.calc1rm(exerciseData, velocity);
    const confidence = OneRMCalculator.getConfidenceInterval(exerciseData);

    dispatch({
        type: CALC_ONE_RM,
        e1rm: Math.sign(e1rm) === 1 ? e1rm : null,
        e1RMVelocity: velocity,
        confidence: confidence,
        chartData: chartData,
    });
};
