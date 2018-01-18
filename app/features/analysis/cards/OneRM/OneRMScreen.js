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
    // const data = SetsSelectors.getExerciseData(state, exercise, 'regression'); // TODO: make regression a config
    // const chartData = SetsSelectors.getExerciseData(state, exercise, 'scatter'); // TODO: make scatter a config

    // Test Data Points that result in 91% confidence

    const data = [
        [255, 0.48], 
        [275, 0.31], 
        [285, 0.30], 
        [295, 0.28], 
        [300, 0.26], 
        [310, 0.22], 
        [320, 0.19],
    ];

    const chartData = [
        {x: 255, y: 0.48, setID: 'A'}, 
        {x: 275, y: 0.31, setID: 'B'}, 
        {x: 285, y: 0.30, setID: 'C'}, 
        {x: 295, y: 0.28, setID: 'D'}, 
        {x: 300, y: 0.26, setID: 'E'}, 
        {x: 310, y: 0.22, setID: 'F'}, 
        {x: 320, y: 0.19, setID: 'G'},
    ];

    const confidence = OneRMCalculator.getConfidenceInterval(data);
    const e1rm = OneRMCalculator.calc1rm(data, velocity);
    const isLoggedIn = AuthSelectors.getIsLoggedIn(state);

    return {
        velocity: velocity,
        exercise: exercise,
        metric: metric,
        chartData: chartData,
        days: days,
        confidence: confidence,
        e1rm: e1rm,
        tagsToInclude: state.analysis.tagsToInclude,
        tagsToExclude: state.analysis.tagsToExclude,
        minConfidence: 90, // TODO: make this a config
        isLoggedIn: isLoggedIn,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        tappedExercise: Actions.presentSelectExercise,
        tappedTagsToInclude: Actions.presentTagsToInclude,
        tappedTagsToExclude: Actions.presentTagsToExclude,
        changeVelocity: Actions.changeE1RMVelocity,
        changeDays: Actions.changeE1RMDays,
    }, dispatch);
};

const OneRMScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(OneRMView);

export default OneRMScreen;
