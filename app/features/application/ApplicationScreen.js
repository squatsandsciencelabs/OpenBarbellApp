import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from './ApplicationActions';
import ApplicationView from './ApplicationView';

const mapStateToProps = (state) => ({
    killSwitch: state.killSwitch,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeTab: Actions.changeTab,
        load: Actions.load
    }, dispatch);
};

const ApplicationScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationView);

export default ApplicationScreen;
