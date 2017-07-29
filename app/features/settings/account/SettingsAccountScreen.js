import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import SettingsAccountPanel from './SettingsAccountPanel';
import * as Actions from './SettingsAccountActions';

const mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        isLoggingIn: state.auth.isLoggingIn,
        syncDate: state.settings.syncDate.toLocaleString(),
        hasChangesToSync: SetsSelectors.hasChangesToSync(state.sets)
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        signIn: Actions.signIn,
        signOut: Actions.signOut,
    }, dispatch);
};

const SettingsAccountScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsAccountPanel);

export default SettingsAccountScreen;
