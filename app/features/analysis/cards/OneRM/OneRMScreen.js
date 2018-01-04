import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OneRM from './OneRM';
import * as Actions from './OneRMActions';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as AppStateActionCreators from 'app/redux/shared_actions/AppStateActionCreators';
import * as OneRMPrediction from 'app/utility/transforms/OneRMPrediction';

const mapStateToProps = (state) => {
    const exercise = AnalysisSelectors.getAnalysisExercise(state);
    const velocity = AnalysisSelectors.getAnalysisVelocity(state);
    const days = AnalysisSelectors.getAnalysisDays(state);
    const data = SetsSelectors.getExerciseData(state, exercise, 'regression');
    const confidence = OneRMPrediction.getConfidenceInterval(data);
    const e1rm = OneRMPrediction.OneRMPrediction(data, velocity);

    return {
        velocity: velocity,
        exercise: exercise,
        days: days,
        confidence: confidence,
        e1rm: e1rm
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        tapExercise: Actions.presentSelectExercise,
        changeVelocity: Actions.changeSliderVelocity,
        changeDays: Actions.changeSliderDays,
        enableTabSwipe: AppStateActionCreators.enableTabSwipe,
        disableTabSwipe: AppStateActionCreators.disableTabSwipe
    }, dispatch);
};

const OneRMScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(OneRM);

export default OneRMScreen;
