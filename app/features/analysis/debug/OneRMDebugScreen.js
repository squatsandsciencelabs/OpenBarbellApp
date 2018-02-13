import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OneRMDebugView from './OneRMDebugView';
import * as Actions from './OneRMDebugActions';

const mapStateToProps = (state) => {
    // TODO: set this to false to remove it from the live production app
    return {
        visible: true,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onPressButton: Actions.test1RM,
    }, dispatch);
};

const OneRMDebugScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(OneRMDebugView);

export default OneRMDebugScreen;
