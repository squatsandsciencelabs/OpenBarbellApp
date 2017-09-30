import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SettingsDevicePanel from './SettingsDevicePanel';
import * as Actions from './SettingsDeviceActions';
import * as ConnectedDeviceStatusSelectors from 'app/redux/selectors/ConnectedDeviceStatusSelectors';

const mapStateToProps = (state) => {
    return {
        deviceStatus: ConnectedDeviceStatusSelectors.getConnectedDeviceStatus(state),
        deviceName: ConnectedDeviceStatusSelectors.getConnectedDeviceName(state),
        scannedDevices: state.scannedDevices,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        startDeviceScan: Actions.startDeviceScan,
        stopDeviceScan: Actions.stopDeviceScan,
        connectDevice: Actions.connectDevice,
        disconnectDevice: Actions.disconnectDevice,
        stopReconnect: Actions.stopReconnect,
    }, dispatch);
};

const SettingsDeviceScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsDevicePanel);

export default SettingsDeviceScreen;
