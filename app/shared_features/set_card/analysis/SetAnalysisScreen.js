import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SetAnalysis from './SetAnalysis';
import * as CollapsedSettingsSelectors from 'app/redux/selectors/CollapsedSettingsSelectors';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

const mapStateToProps = (state, ownProps) => ({
    metric1: CollapsedSettingsSelectors.getMetric1(state),
    quantifier1: CollapsedSettingsSelectors.getQuantifier1(state),
    metric2: CollapsedSettingsSelectors.getMetric2(state),
    quantifier2: CollapsedSettingsSelectors.getQuantifier2(state),
    metric3: CollapsedSettingsSelectors.getMetric3(state),
    quantifier3: CollapsedSettingsSelectors.getQuantifier3(state),
    metric4: CollapsedSettingsSelectors.getMetric4(state),
    quantifier4: CollapsedSettingsSelectors.getQuantifier4(state),
    metric5: CollapsedSettingsSelectors.getMetric5(state),
    quantifier5: CollapsedSettingsSelectors.getQuantifier5(state),
    getBestAvgVelocityEver: SetsSelectors.getBestAvgVelocityEver(state, ownProps.set),
    getBestPKVEver: SetsSelectors.getBestPKVEver(state, ownProps.set),
    getBestDurationEver: SetsSelectors.getBestDurationEver(state, ownProps.set),
});

const SetAnalysisScreen = connect(
    mapStateToProps,
)(SetAnalysis);

export default SetAnalysisScreen;
