import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SetAnalysis from './SetAnalysis';

const mapStateToProps = (state) => ({
    metric1: state.settings.metric1,
    quantifier1: state.settings.quantifier1,
    metric2: state.settings.metric2,
    quantifier2: state.settings.quantifier2,
    metric3: state.settings.metric3,
    quantifier3: state.settings.quantifier3,
    metric4: state.settings.metric4,
    quantifier4: state.settings.quantifier4,
    metric5: state.settings.metric5,
    quantifier5: state.settings.quantifier5,
    state: state
});

const SetAnalysisScreen = connect(
    mapStateToProps,
    null
)(SetAnalysis);

export default SetAnalysisScreen;
