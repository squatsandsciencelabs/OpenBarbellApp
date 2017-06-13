// app/containers/EditHistoryExerciseScreen.js

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EditTextModal from '../components/EditTextModal';
import * as SetActionCreators from '../actions/SetActionCreators';
import * as HistoryActionCreators from '../actions/HistoryActionCreators';
import * as SuggestionsReducer from '../reducers/SuggestionsReducer';

const mapStateToProps = (state) => {
	// save the model
	let model = state.suggestions.exerciseModel;
	
	return {
        title: 'Edit Exercise',
		placeholder: 'Enter Exercise',
		text: state.history.editingExercise,
		setID: state.history.editingSetID,
		generateSuggestions: (input) => { return SuggestionsReducer.generateSuggestions(input, model) },
        modalShowing: state.history.editingSetID !== null
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		updateSet: SetActionCreators.updateHistorySet,
        closeModal: HistoryActionCreators.endEditHistoryExerciseName,
	}, dispatch);
};

const EditHistoryExerciseScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(EditTextModal);

export default EditHistoryExerciseScreen;
