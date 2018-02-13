import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OneRMCalculateView from './OneRMCalculateView';
import * as Actions from './OneRMCalculateActions';
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
    chartData: AnalysisSelectors.get1RMChartData(state),
    regLineData: AnalysisSelectors.getRegLineData(state),
    days: AnalysisSelectors.getAnalysisRange(state),
    r2: AnalysisSelectors.getCurrentR2(state),
    e1rmVelocity: AnalysisSelectors.getAnalysisE1RMVelocity(state),
    e1rm: AnalysisSelectors.getCurrentE1rm(state),
    tagsToInclude: AnalysisSelectors.getTagsToInclude(state),
    tagsToExclude: AnalysisSelectors.getTagsToExclude(state),
    minr2: 90, // TODO: make this a config
    isLoggedIn: AuthSelectors.getIsLoggedIn(state),
    isBestResultsModalShowing: AnalysisSelectors.getShowBestResultsModal(state),
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        calcE1rm: Actions.calcE1rm,
        tappedExercise: Actions.presentSelectExercise,
        tappedTagsToInclude: Actions.presentTagsToInclude,
        tappedTagsToExclude: Actions.presentTagsToExclude,
        changeVelocity: Actions.changeVelocitySlider,
        changeDays: Actions.changeE1RMDays,
        showBestResultsModal: Actions.showBestResultsModal,
        dismissBestResultsModal: Actions.dismissBestResultsModal,
    }, dispatch);
};

const OneRMScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(OneRMCalculateView);

export default OneRMScreen;
