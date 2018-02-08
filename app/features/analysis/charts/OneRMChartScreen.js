import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OneRMChartView from './OneRMChartView';
import * as Actions from './OneRMChartActions';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';
import * as AppStateActionCreators from 'app/redux/shared_actions/AppStateActionCreators';
import * as OneRMCalculator from 'app/utility/transforms/OneRMCalculator';

const mapStateToProps = (state) => {
    const chartData = AnalysisSelectors.getChartData(state);
    const regressionLine = AnalysisSelectors.getRegLineData(state);

    // TODO: store these values instsead of recalculating them every single time
    if (regressionLine) {
        var regLeftPoint = regressionLine[0];
    } else {
        var regLeftPoint = null;
    }
    const highestWeightPossible = OneRMCalculator.highestWeightPossible(regressionLine);
    const regRightPoint = {x: highestWeightPossible, y: 0};

    return {
        chartData: chartData,
        regLeftPoint: regLeftPoint,
        regRightPoint: regRightPoint,
        isR2HighEnough: AnalysisSelectors.getCurrentR2(state) > 90, // TODO: this should be in a selector instead of calculating > 90 here
        isLoggedIn: AuthSelectors.getIsLoggedIn(state),
        highestWeight: highestWeightPossible,
        lowestWeight: OneRMCalculator.lowestWeight(chartData),
        highestVel: OneRMCalculator.highestVelocity(chartData),
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        tapPoint: Actions.tapPoint,
    }, dispatch);
};

const OneRMChartScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(OneRMChartView);

export default OneRMChartScreen;
