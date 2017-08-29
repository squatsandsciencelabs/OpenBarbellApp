import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ConnectedDeviceStatus from './ConnectedDeviceStatus';
import * as ConnectedDeviceStatusSelectors from 'app/redux/selectors/ConnectedDeviceStatusSelectors';

const mapStateToProps = (state) => ({
    deviceStatus: ConnectedDeviceStatusSelectors.getConnectedDeviceStatus(state),
    deviceName: ConnectedDeviceStatusSelectors.getConnectedDeviceName(state),
    deviceIdentifier: ConnectedDeviceStatusSelectors.getConnectedDeviceIdentifier(state)
});

const ConnectedDeviceStatusScreen = connect(
    mapStateToProps
)(ConnectedDeviceStatus);

export default ConnectedDeviceStatusScreen;
