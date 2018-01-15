import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OneRMView from './OneRMView';
import * as Actions from './OneRMActions';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';
import * as AppStateActionCreators from 'app/redux/shared_actions/AppStateActionCreators';
import * as OneRMCalculator from 'app/utility/transforms/OneRMCalculator';

const mapStateToProps = (state) => {
    const exercise = AnalysisSelectors.getAnalysisE1RMExercise(state);
    const velocity = AnalysisSelectors.getAnalysisE1RMVelocity(state);
    const metric = SettingsSelectors.getDefaultMetric(state);
    const days = AnalysisSelectors.getAnalysisRange(state);
    const data = SetsSelectors.getExerciseData(state, exercise, 'regression'); // TODO: make regression a config
    const chartData = SetsSelectors.getExerciseData(state, exercise, 'scatter'); // TODO: make scatter a config

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

    // const chartData = [[
    //     {title: 'a', weight: 255, velocity: 0.48}, 
    //     {title: 'b', weight: 275, velocity: 0.31}, 
    //     {title: 'c', weight: 285, velocity: 0.30}, 
    //     {title: 'd', weight: 295, velocity: 0.28}, 
    //     {title: 'e', weight: 300, velocity: 0.26}, 
    //     {title: 'f', weight: 310, velocity: 0.22}, 
    //     {title: 'g', weight: 320, velocity: 0.19}
    // ]];

    const confidence = OneRMCalculator.getConfidenceInterval(data);
    const e1rm = OneRMCalculator.calc1rm(data, velocity);
    const email = AuthSelectors.getEmail(state);

    return {
        velocity: velocity,
        exercise: exercise,
        metric: metric,
        chartData: chartData,
        days: days,
        confidence: confidence,
        e1rm: e1rm,
        minConfidence: 90, // TODO: make this a config
        email: email,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        tapExercise: Actions.presentSelectExercise,
        changeVelocity: Actions.changeE1RMVelocity,
        changeDays: Actions.changeE1RMDays,
    }, dispatch);
};

const OneRMScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(OneRMView);

export default OneRMScreen;
