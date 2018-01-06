import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OneRMView from './OneRMView';
import * as Actions from './OneRMActions';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as AppStateActionCreators from 'app/redux/shared_actions/AppStateActionCreators';
import * as OneRMCalculator from 'app/utility/transforms/OneRMCalculator';

const mapStateToProps = (state) => {
    const exercise = AnalysisSelectors.getAnalysisE1RMExercise(state);
    const velocity = AnalysisSelectors.getAnalysisE1RMVelocity(state);
    const days = AnalysisSelectors.getAnalysisRange(state);
    const data = SetsSelectors.getExerciseData(state, exercise, 'regression');
    const confidence = OneRMCalculator.getConfidenceInterval(data);
    const e1rm = OneRMCalculator.calc1rm(data, velocity);

    return {
        velocity: velocity,
        exercise: exercise,
        days: days,
        confidence: confidence,
        e1rm: e1rm,
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
