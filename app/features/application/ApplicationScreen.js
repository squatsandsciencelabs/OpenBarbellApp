import { Keyboard } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ApiActionCreators from 'app/redux/shared_actions/ApiActionCreators';
import * as SetActionCreators from 'app/redux/shared_actions/SetActionCreators';
import ApplicationView from './ApplicationView';

const mapStateToProps = (state) => ({
    killSwitch: state.killSwitch,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onChangeTab: () => (dispatch) => {
            dispatch(ApiActionCreators.syncData());
            dispatch(SetActionCreators.endOldWorkout());
            Keyboard.dismiss();
        },
        onMount: ApiActionCreators.syncData
    }, dispatch);
};

const ApplicationScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationView);

export default ApplicationScreen;
