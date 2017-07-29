import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SettingsDevicePanel from './SettingsDevicePanel';
import * as Actions from './SettingsDeviceActions';

const mapStateToProps = (state) => {
    return {
        deviceStatus: state.connectedDevice.status,
        deviceName: state.connectedDevice.deviceName,
        scannedDevices: state.scannedDevices,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        startDeviceScan: Actions.startDeviceScan,
        stopDeviceScan: Actions.stopDeviceScan,
        connectDevice: Actions.connectDevice,
        disconnectDevice: Actions.disconnectDevice,
    }, dispatch);
};

const SettingsDeviceScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsDevicePanel);

export default SettingsDeviceScreen;
