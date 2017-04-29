// app/containers/SettingsScreen.js

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SettingsTab from '../components/SettingsTab';
import * as DeviceActionCreators from '../actions/DeviceActionCreators';
import * as AuthActionCreators from '../actions/AuthActionCreators';
import * as SettingsActionCreators from '../actions/SettingsActionCreators';

const mapStateToProps = (state) => {
	return {
		scannedDevices: state.scannedDevices,
		connectedDevice: state.connectedDevice,
		killSwitch: state.killSwitch,
		email: state.auth.email,
		isLoggingIn: state.auth.isLoggingIn,
		endSetTimerDuration: state.settings.endSetTimerDuration,
		syncDate: state.settings.syncDate.toLocaleString()
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

export default SettingsScreen
