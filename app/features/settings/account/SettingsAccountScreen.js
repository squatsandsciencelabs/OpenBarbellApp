import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';
import SettingsAccountPanel from './SettingsAccountPanel';
import * as Actions from './SettingsAccountActions';

const mapStateToProps = (state) => {
    return {
        email: AuthSelectors.getEmail(state),
        isLoggingIn: AuthSelectors.getIsLoggingIn(state),
        syncDate: state.settings.syncDate.toLocaleString(),
        hasChangesToSync: SetsSelectors.hasChangesToSync(state),
        isExportingCSV: SettingsSelectors.getIsExportingCSV(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        signIn: Actions.signIn,
        signOut: Actions.signOut,
        exportCSV: Actions.exportCSV,
        cancelSignOut: Actions.cancelSignOut,
    }, dispatch);
};

const SettingsAccountScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsAccountPanel);

export default SettingsAccountScreen;
