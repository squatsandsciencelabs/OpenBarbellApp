import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ApiActionCreators from 'app/redux/shared_actions/ApiActionCreators';
import * as ApplicationActions from './ApplicationActions';
import ApplicationView from './ApplicationView';

const mapStateToProps = (state) => ({
    killSwitch: state.killSwitch,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onChangeTab: ApplicationActions.onChangeTab,
        onMount: ApiActionCreators.syncData
    }, dispatch);
};

const ApplicationScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationView);

export default ApplicationScreen;
