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
    const data = SetsSelectors.getExerciseData(state, exercise, 'regression');
    const chartData = SetsSelectors.getExerciseData(state, exercise, 'scatter');   
    
    // Test Data Points that result in 91% confidence
    // const data = [
    //     [255, 0.48], 
    //     [275, 0.31], 
    //     [285, 0.30], 
    //     [295, 0.28], 
    //     [300, 0.26], 
    //     [310, 0.22], 
    //     [320, 0.19]
    // ];

    // const chartData = [
    //     {setID: 'a', x: 255, y: 0.48}, 
    //     {setID: 'b', x: 275, y: 0.31}, 
    //     {setID: 'c', x: 285, y: 0.30}, 
    //     {setID: 'd', x: 295, y: 0.28}, 
    //     {setID: 'e', x: 300, y: 0.26}, 
    //     {setID: 'f', x: 310, y: 0.22}, 
    //     {setID: 'g', x: 320, y: 0.19}
    // ];

    const e1rm = OneRMCalculator.calc1rm(data, velocity);
    const confidence = OneRMCalculator.getConfidenceInterval(data);

    dispatch({
        type: CALC_ONE_RM,
        e1rm: e1rm,
        e1RMVelocity: velocity,
        confidence: confidence,
        chartData: chartData,
    });
};
