import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SettingsTab from './SettingsTab';
import * as DeviceActionCreators from 'app/redux/shared_actions/DeviceActionCreators';
import * as AuthActionCreators from 'app/redux/shared_actions/AuthActionCreators';
import * as SettingsActionCreators from 'app/redux/shared_actions/SettingsActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

const mapStateToProps = (state) => {
    return {
        scannedDevices: state.scannedDevices,
        connectedDevice: state.connectedDevice,
        killSwitch: state.killSwitch,
        email: state.auth.email,
        isLoggingIn: state.auth.isLoggingIn,
        endSetTimerDuration: state.settings.endSetTimerDuration,
        syncDate: state.settings.syncDate.toLocaleString(),
        hasChangesToSync: SetsSelectors.hasChangesToSync(state.sets)
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        startDeviceScan: DeviceActionCreators.startDeviceScan,
        stopDeviceScan: DeviceActionCreators.stopDeviceScan,
        connectDevice: DeviceActionCreators.connectDevice,
        disconnectDevice: DeviceActionCreators.disconnectDevice,
        signIn: AuthActionCreators.signIn,
        signOut: AuthActionCreators.signOut,
        editSetTimer: SettingsActionCreators.editSetTimer,
        endEditSetTimer: SettingsActionCreators.endEditSetTimer
    }, dispatch);
};

const SettingsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsTab);

export default SettingsScreen;
