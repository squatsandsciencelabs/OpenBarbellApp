import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SetAnalysis from './SetAnalysis';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';

const mapStateToProps = (state) => ({
    metric1: SettingsSelectors.getMetric1(state),
    quantifier1: SettingsSelectors.getQuantifier1(state),
    metric2: SettingsSelectors.getMetric2(state),
    quantifier2: SettingsSelectors.getQuantifier2(state),
    metric3: SettingsSelectors.getMetric3(state),
    quantifier3: SettingsSelectors.getQuantifier3(state),
    metric4: SettingsSelectors.getMetric4(state),
    quantifier4: SettingsSelectors.getQuantifier4(state),
    metric5: SettingsSelectors.getMetric5(state),
    quantifier5: SettingsSelectors.getQuantifier5(state),
    state: state
});

const SetAnalysisScreen = connect(
    mapStateToProps,
    null
)(SetAnalysis);

export default SetAnalysisScreen;
