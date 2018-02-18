import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OneRMCalculateView from './OneRMCalculateView';
import * as Actions from './OneRMCalculateActions';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as AppStateActionCreators from 'app/redux/shared_actions/AppStateActionCreators';
import * as OneRMCalculator from 'app/math/OneRMCalculator';

const mapStateToProps = (state) => ({
    velocity: AnalysisSelectors.getVelocitySlider(state),
    exercise: AnalysisSelectors.getExercise(state),
    days: AnalysisSelectors.getDaysRange(state),
    tagsToInclude: AnalysisSelectors.getTagsToInclude(state),
    tagsToExclude: AnalysisSelectors.getTagsToExclude(state),
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        calcE1RM: Actions.calcE1RM,
        tappedExercise: Actions.presentSelectExercise,
        tappedTagsToInclude: Actions.presentTagsToInclude,
        tappedTagsToExclude: Actions.presentTagsToExclude,
        changeVelocity: Actions.changeVelocitySlider,
        changeDays: Actions.changeE1RMDays,
        presentInfoModal: Actions.presentInfoModal,
    }, dispatch);
};

const OneRMScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(OneRMCalculateView);

export default OneRMScreen;
