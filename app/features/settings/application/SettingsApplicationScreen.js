import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SettingsApplicationPanel from './SettingsApplicationPanel';
import * as Actions from './SettingsApplicationActions';

const mapStateToProps = (state) => ({
    endSetTimerDuration: state.settings.endSetTimerDuration,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        tapEndSetTimer: Actions.presentEndSetTimer,
    }, dispatch);
};

const SettingsApplicationScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsApplicationPanel);

export default SettingsApplicationScreen;
