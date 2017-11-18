import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SettingsMetricsPanel from './SettingsMetricsPanel';
import * as Actions from './SettingsMetricsActions';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';

const mapStateToProps = (state) => ({
    metric1: state.settings.metric1,
    quantifier1: state.settings.quantifier1,
    metric2: state.settings.metric2,
    quantifier2: state.settings.quantifier2,
    metric3: state.settings.metric3,
    quantifier3: state.settings.quantifier3,
    metric4: state.settings.metric4,
    quantifier4: state.settings.quantifier4
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        tapMetric: Actions.presentCollapsedMetrics,
        tapQuantifier: Actions.presentQuantifiers
    }, dispatch);
};

const SettingsMetricsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsMetricsPanel);

export default SettingsMetricsScreen;
