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
    const exerciseData = SetsSelectors.getExerciseData(state, exercise); // get data for use in OneRM calculation
    const chartData = SetsSelectors.getChartData(state, exercise); // data for plotting chart points
    const regLineData = SetsSelectors.getRegLinePoints(state, exercise); // data for plotting regression line
    
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
    //     {setID: 'f49b7f6f-921e-4ad0-b5ea-34621c4cd2be', x: 255, y: 0.48}, // SQUAT
    //     {setID: '1850f26a-2e82-4b31-b434-bbd4c6c9179b', x: 275, y: 0.31}, // EMPTY #1
    //     {setID: '640d73e0-4851-4b9a-97ba-880b389a2890', x: 285, y: 0.30}, // Front Squat #1
    //     {setID: '9aef9e6b-0477-48eb-b55d-b08de64b5421', x: 295, y: 0.28}, // Front Squat #1
    //     {setID: '7a4e9fee-f061-4aeb-94eb-d031b323f64f', x: 300, y: 0.26}, // Deadlift #3
    //     {setID: 'c1a9ade8-ac13-4b9b-89e8-2922b9fdf049', x: 310, y: 0.22}, // Bench #1
    //     {setID: '30e60758-a19b-4942-9421-243af33a3bfa', x: 320, y: 0.19},  // Sumo Deadlift #1
    // ];

    // const regLineData = [
    //     {setID: 'f49b7f6f-921e-4ad0-b5ea-34621c4cd2be', x: 255, y: 0.4408}, 
    //     {setID: '1850f26a-2e82-4b31-b434-bbd4c6c9179b', x: 275, y: 0.3588}, 
    //     {setID: '640d73e0-4851-4b9a-97ba-880b389a2890', x: 285, y: 0.3178}, 
    //     {setID: '9aef9e6b-0477-48eb-b55d-b08de64b5421', x: 295, y: 0.2768}, 
    //     {setID: '7a4e9fee-f061-4aeb-94eb-d031b323f64f', x: 300, y: 0.2563}, 
    //     {setID: 'c1a9ade8-ac13-4b9b-89e8-2922b9fdf0499', x: 310, y: 0.2153}, 
    //     {setID: '30e60758-a19b-4942-9421-243af33a3bfa', x: 320, y: 0.1743},
    // ];

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
