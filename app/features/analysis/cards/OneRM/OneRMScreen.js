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

const mapStateToProps = (state) => ({
    velocity: AnalysisSelectors.getVelocitySlider(state),
    exercise: AnalysisSelectors.getAnalysisE1RMExercise(state),
    metric: SettingsSelectors.getDefaultMetric(state),
    chartData: AnalysisSelectors.getChartData(state),
    regLineData: AnalysisSelectors.getRegLineData(state),
    days: AnalysisSelectors.getAnalysisRange(state),
    confidence: AnalysisSelectors.getCurrentConfidence(state),
    e1rmVelocity: AnalysisSelectors.getAnalysisE1RMVelocity(state),
    e1rm: AnalysisSelectors.getCurrentE1rm(state),
    tagsToInclude: AnalysisSelectors.getTagsToInclude(state),
    tagsToExclude: AnalysisSelectors.getTagsToExclude(state),
    minConfidence: 90, // TODO: make this a config
    isLoggedIn: AuthSelectors.getIsLoggedIn(state),
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        calcE1rm: Actions.calcE1rm,
        tappedExercise: Actions.presentSelectExercise,
        tappedTagsToInclude: Actions.presentTagsToInclude,
        tappedTagsToExclude: Actions.presentTagsToExclude,
        changeVelocity: Actions.changeVelocitySlider,
        changeDays: Actions.changeE1RMDays,
    }, dispatch);
};

const OneRMScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(OneRMView);

export default OneRMScreen;
