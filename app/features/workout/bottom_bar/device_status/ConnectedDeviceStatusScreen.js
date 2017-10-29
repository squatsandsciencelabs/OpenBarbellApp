import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ConnectedDeviceStatus from './ConnectedDeviceStatus';
import * as Actions from './ConnectedDeviceStatusActions';
import * as ConnectedDeviceStatusSelectors from 'app/redux/selectors/ConnectedDeviceStatusSelectors';

const mapStateToProps = (state) => ({
    deviceStatus: ConnectedDeviceStatusSelectors.getConnectedDeviceStatus(state),
    deviceName: ConnectedDeviceStatusSelectors.getConnectedDeviceName(state),
    deviceIdentifier: ConnectedDeviceStatusSelectors.getConnectedDeviceIdentifier(state)
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        tappedDevice: Actions.tappedDevice,
    }, dispatch);
};

const ConnectedDeviceStatusScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedDeviceStatus);

export default ConnectedDeviceStatusScreen;
