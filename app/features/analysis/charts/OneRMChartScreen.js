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

const mapStateToProps = (state) => ({
    chartData: AnalysisSelectors.getChartData(state),
    regLineData: AnalysisSelectors.getRegLineData(state),
    confidence: AnalysisSelectors.getCurrentConfidence(state),
    minConfidence: 90, // TODO: make this a config
    isLoggedIn: AuthSelectors.getIsLoggedIn(state),
});

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
