import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OneRMResultsView from './OneRMResultsView';
import * as Actions from './OneRMResultsActions';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';
import * as AppStateActionCreators from 'app/redux/shared_actions/AppStateActionCreators';
import * as OneRMCalculator from 'app/utility/transforms/OneRMCalculator';

const mapStateToProps = (state) => {
    const chartData = AnalysisSelectors.get1RMChartData(state);
    const regressionLine = AnalysisSelectors.getRegLineData(state);
    const isR2HighEnough = AnalysisSelectors.getIsR2HighEnough(state);

    // TODO: store regression point and weight values instsead of recalculating them every single time for speed
    // otherwise it's slow on launch every time, especially with every action
    if (isR2HighEnough) {
        var highestWeight = OneRMCalculator.highestWeightPossible(regressionLine);
    } else {
        var highestWeight = OneRMCalculator.highestWeight(chartData);
    }

    if (regressionLine) {
        var regLeftPoint = regressionLine[0];
    } else {
        var regLeftPoint = null;
    }
    const regRightPoint = {x: highestWeight, y: 0};

    return {
        chartData: chartData,
        regLeftPoint: regLeftPoint,
        regRightPoint: regRightPoint,
        isR2HighEnough: isR2HighEnough,
        isLoggedIn: AuthSelectors.getIsLoggedIn(state),
        highestWeight: highestWeight,
        lowestWeight: OneRMCalculator.lowestWeight(chartData),
        highestVel: OneRMCalculator.highestVelocity(chartData),
        isInfoModalShowing: AnalysisSelectors.getShowInfoModal(state),
        isProtocolModalShowing: AnalysisSelectors.getShowProtocolModal(state),    
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        tapPoint: Actions.tapPoint,
        showInfoModal: Actions.showInfoModal,
        showProtocolModal: Actions.showProtocolModal,
        dismissInfoModal: Actions.dismissInfoModal,
        dismissProtocolModal: Actions.dismissProtocolModal,
    }, dispatch);
};

const OneRMChartScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(OneRMResultsView);

export default OneRMChartScreen;
