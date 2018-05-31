import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SettingsApplicationPanel from './SettingsApplicationPanel';
import * as Actions from './SettingsApplicationActions';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';

const mapStateToProps = (state) => ({
    endSetTimerDuration: SettingsSelectors.getEndSetTimerDuration(state),
    defaultMetric: SettingsSelectors.getDefaultMetric(state),
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        tapEndSetTimer: Actions.presentEndSetTimer,
        tapDefaultMetric: Actions.presentSetMetric,
    }, dispatch);
};

const SettingsApplicationScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsApplicationPanel);

export default SettingsApplicationScreen;
