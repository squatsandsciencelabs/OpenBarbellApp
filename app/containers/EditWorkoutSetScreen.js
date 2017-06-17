// app/containers/EditWorkoutSetScreen.js

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EditSetHeader from '../components/EditSetHeader';
import * as SetActionCreators from '../actions/SetActionCreators';
import * as WorkoutActionCreators from '../actions/WorkoutActionCreators';

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		updateSet: SetActionCreators.updateWorkoutSet,
		editExercise: WorkoutActionCreators.beginEditWorkoutExerciseName,
	}, dispatch);
};

const EditWorkoutSetScreen = connect(
	null,
	mapDispatchToProps
)(EditSetHeader);

export default EditWorkoutSetScreen;
