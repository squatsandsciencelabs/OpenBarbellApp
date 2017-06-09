// app/containers/EditHistoryExerciseScreen.js

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EditTextModal from '../components/EditTextModal';
import * as SetActionCreators from '../actions/SetActionCreators';
import * as SuggestionsActionCreators from '../actions/SuggestionsActionCreators';
import * as SuggestionsReducer from '../reducers/SuggestionsReducer';

const mapStateToProps = (state) => {
	// save the model
	let model = state.suggestions.exerciseModel;
	
	return {
        title: 'Edit Exercise',
		generateSuggestions: (input) => { return SuggestionsReducer.generateSuggestions(input, model) },
        modalShowing: state.suggestions.isEditingHistoryExerciseName
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		updateSet: SetActionCreators.updateHistorySet,
        closeModal: SuggestionsActionCreators.endEditHistoryExerciseName,
	}, dispatch);
};

const EditHistoryExerciseScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(EditTextModal);

export default EditHistoryExerciseScreen;
