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
    // const exerciseData = SetsSelectors.getExerciseData(state, exercise); // get data for use in OneRM calculation
    // const chartData = SetsSelectors.getChartData(state, exercise); // data for plotting chart points
    // const regLineData = SetsSelectors.getRegLinePoints(state, exercise); // data for plotting regression line
    
    // Test Data Points that result in 91% confidence
    const exerciseData = [
        [255, 0.48], 
        [275, 0.31], 
        [285, 0.30], 
        [295, 0.28], 
        [300, 0.26], 
        [310, 0.22], 
        [320, 0.19]
    ];

    const chartData = [
        {setID: 'dfa3113f-9cd9-48fe-bbbc-c5adc69ceac7', x: 255, y: 0.48}, 
        {setID: 'b727077c-88cc-42ab-b3a5-9623ac2ea8b6', x: 275, y: 0.31}, 
        {setID: '1665b792-328a-41d6-92f7-b85892e56386', x: 285, y: 0.30}, 
        {setID: '8d1ad6a5-a039-413f-95c8-e1d0cf72f4e3', x: 295, y: 0.28}, 
        {setID: 'f49b7f6f-921e-4ad0-b5ea-34621c4cd2be', x: 300, y: 0.26}, 
        {setID: 'd10208d5-aec4-447d-a0d6-3f40c73cbbe9', x: 310, y: 0.22}, 
        {setID: '4139c974-3ce2-4d4f-a573-05795121da92', x: 320, y: 0.19}  
    ];

    const regLineData = [
        {setID: 'dfa3113f-9cd9-48fe-bbbc-c5adc69ceac7', x: 255, y: 0.4408}, 
        {setID: 'b727077c-88cc-42ab-b3a5-9623ac2ea8b6', x: 275, y: 0.3588}, 
        {setID: '1665b792-328a-41d6-92f7-b85892e56386', x: 285, y: 0.3178}, 
        {setID: '8d1ad6a5-a039-413f-95c8-e1d0cf72f4e3', x: 295, y: 0.2768}, 
        {setID: 'f49b7f6f-921e-4ad0-b5ea-34621c4cd2be', x: 300, y: 0.2563}, 
        {setID: 'd10208d5-aec4-447d-a0d6-3f40c73cbbe9', x: 310, y: 0.2153}, 
        {setID: '4139c974-3ce2-4d4f-a573-05795121da92', x: 320, y: 0.1743}
    ];

    const e1rm = OneRMCalculator.calc1rm(exerciseData, velocity);
    const r2 = OneRMCalculator.getR2interval(exerciseData);

    dispatch({
        type: CALC_ONE_RM,
        e1rm: Math.sign(e1rm) === 1 ? e1rm : null,
        e1RMVelocity: velocity,
        r2: r2,
        chartData: chartData,
        regLineData: regLineData,
    });
};
