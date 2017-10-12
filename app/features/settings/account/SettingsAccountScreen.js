import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';
import SettingsAccountPanel from './SettingsAccountPanel';
import * as Actions from './SettingsAccountActions';

const mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        isLoggingIn: state.auth.isLoggingIn,
        syncDate: state.settings.syncDate.toLocaleString(),
        hasChangesToSync: SetsSelectors.hasChangesToSync(state),
        shouldShowRemoved: SettingsSelectors.getShowRemoved(state),
        isExportingCSV: SettingsSelectors.getIsExportingCSV(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        signIn: Actions.signIn,
        signOut: Actions.signOut,
        showRemoved: Actions.showRemovedData,
        hideRemoved: Actions.hideRemovedData,
        exportCSV: Actions.exportCSV,
    }, dispatch);
};

const SettingsAccountScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsAccountPanel);

export default SettingsAccountScreen;
