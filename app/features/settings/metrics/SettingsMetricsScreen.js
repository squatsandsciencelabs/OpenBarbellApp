import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SettingsMetricsPanel from './SettingsMetricsPanel';
import * as Actions from './SettingsMetricsActions';
import * as CollapsedSettingsSelectors from 'app/redux/selectors/CollapsedSettingsSelectors';

const mapStateToProps = (state) => ({
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
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        tapMetric: Actions.presentCollapsedMetric,
        tapQuantifier: Actions.presentQuantifier,
    }, dispatch);
};

const SettingsMetricsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsMetricsPanel);

export default SettingsMetricsScreen;
