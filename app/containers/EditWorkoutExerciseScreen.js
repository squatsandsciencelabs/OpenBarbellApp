// app/containers/EditWorkoutExerciseScreen.js

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EditTextModal from '../components/EditTextModal';
import * as SetActionCreators from '../actions/SetActionCreators';
import * as WorkoutActionCreators from '../actions/WorkoutActionCreators';
import * as SuggestionsReducer from '../reducers/SuggestionsReducer';

const mapStateToProps = (state) => {
	// save the model
	let model = state.suggestions.exerciseModel;
	
	return {
        title: 'Edit Exercise',
		placeholder: 'Enter Exercise',
		text: state.workout.editingExercise,
		setID: state.workout.editingExerciseSetID,
		generateSuggestions: (input) => { return SuggestionsReducer.generateSuggestions(input, model) },
        modalShowing: state.workout.editingExerciseSetID !== null
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		updateSetSingle: SetActionCreators.updateWorkoutSet,
        closeModal: WorkoutActionCreators.endEditWorkoutExerciseName,
	}, dispatch);
};

const EditWorkoutExerciseScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(EditTextModal);

export default EditWorkoutExerciseScreen;
