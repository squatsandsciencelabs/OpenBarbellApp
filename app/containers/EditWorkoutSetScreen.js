// app/containers/EditWorkoutSetScreen.js

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EditSetModal from '../components/EditSetModal';
import * as SetActionCreators from '../actions/SetActionCreators';
import * as WorkoutActionCreators from '../actions/WorkoutActionCreators';
import { getEditWorkoutSet } from '../reducers/SetReducer';

const mapStateToProps = (state) => {
	let setID = state.workout.editingSetID;
	let set = getEditWorkoutSet(state.sets, setID);

	return {
		modalShowing: state.workout.editing,
		set: set,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		updateSet: SetActionCreators.updateWorkoutSet,
		closeModal: WorkoutActionCreators.endEditWorkoutSet,
	}, dispatch);
};

const EditWorkoutSetScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(EditSetModal);

export default EditWorkoutSetScreen;
