import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OneRMResultsView from './OneRMResultsView';
import * as Actions from './OneRMResultsActions';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as AppStateActionCreators from 'app/redux/shared_actions/AppStateActionCreators';
import * as OneRMCalculator from 'app/math/OneRMCalculator';

const mapStateToProps = (state) => {
    const activeChartData = AnalysisSelectors.getActiveChartData(state);
    const errorChartData = AnalysisSelectors.getErrorChartData(state);
    const unusedChartData = AnalysisSelectors.getUnusedChartData(state);
    const regressionPoints = AnalysisSelectors.getRegressionPoints(state);
    const isR2HighEnough = AnalysisSelectors.getIsR2HighEnough(state);
    const minX = AnalysisSelectors.getMinX(state) * 0.9;
    var maxX = AnalysisSelectors.getMaxX(state) * 1.1;
    const maxY = AnalysisSelectors.getMaxY(state) * 1.1;

    const shouldDisplayRegression = isR2HighEnough
                                    && regressionPoints
                                    && regressionPoints.length === 2
                                    && activeChartData.length >= 5
                                    && AnalysisSelectors.getIsRegressionNegative(state);

    // TODO: store regression point and weight values instead of recalculating them every single time for speed
    // otherwise it's slow on launch every time, especially with every action
    if (shouldDisplayRegression) {
        // there's a regression line
        var regLeftPoint = regressionPoints[0];
        var regRightPoint = regressionPoints[1];
        var e1RM = AnalysisSelectors.getE1RM(state);
        maxX = Math.max(maxX, regRightPoint.x);
    } else {
        // no regression line
        var regLeftPoint = null;
        var regRightPoint = null;
        var e1RM = null;
    }

    return {
        velocity: AnalysisSelectors.getAnalysisVelocity(state),
        e1RM: e1RM,    
        metric: SettingsSelectors.getDefaultMetric(state),
        r2: AnalysisSelectors.getR2(state),
        shouldDisplayRegression: shouldDisplayRegression,
        activeChartData: activeChartData,
        errorChartData: errorChartData,
        unusedChartData: unusedChartData,
        regLeftPoint: regLeftPoint,
        regRightPoint: regRightPoint,
        minX: minX,
        maxX: maxX,
        maxY: maxY,
        dragged: AnalysisSelectors.getAnalysisDragged(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        tappedSet: Actions.tappedSet,
        presentAlgorithm: Actions.presentAlgorithm,
        presentBestResults: Actions.presentBestResults,
    }, dispatch);
};

const OneRMChartScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(OneRMResultsView);

export default OneRMChartScreen;
