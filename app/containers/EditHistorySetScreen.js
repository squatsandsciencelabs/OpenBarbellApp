// app/containers/EditHistorySetScreen.js

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EditSetHeader from '../components/EditSetHeader';
import * as SetActionCreators from '../actions/SetActionCreators';
import * as HistoryActionCreators from '../actions/HistoryActionCreators';

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		updateSet: SetActionCreators.updateHistorySet,
		editExercise: HistoryActionCreators.beginEditHistoryExerciseName,
	}, dispatch);
};

const EditHistorySetScreen = connect(
	null,
	mapDispatchToProps
)(EditSetHeader);

export default EditHistorySetScreen;
