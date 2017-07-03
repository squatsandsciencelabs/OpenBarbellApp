// app/container/ApplicationScreen.js

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ApplicationView from '../components/ApplicationView';
import * as ApiActionCreators from '../actions/ApiActionCreators';
import * as SetActionCreators from '../actions/SetActionCreators';
import { Keyboard } from 'react-native';

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
