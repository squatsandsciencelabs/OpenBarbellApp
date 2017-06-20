// app/containers/EditWorkoutTagsScreen.js

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EditTextModal from '../components/EditTextModal';
import * as SetActionCreators from '../actions/SetActionCreators';
import * as WorkoutActionCreators from '../actions/WorkoutActionCreators';
import * as SuggestionsReducer from '../reducers/SuggestionsReducer';

const mapStateToProps = (state) => {
	// save the model
	let model = state.suggestions.tagsModel;
	
	return {
        title: 'Edit Tags',
		placeholder: 'Enter Tag',
		text: '',
		multipleInput: false,
		setID: state.workout.editingTagsSetID,
		generateSuggestions: (input) => { return SuggestionsReducer.generateSuggestions(input, model) },
        modalShowing: state.workout.editingTagsSetID !== null
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		updateSet: SetActionCreators.updateWorkoutSet,
        closeModal: WorkoutActionCreators.endEditWorkoutTags,
	}, dispatch);
};

const EditWorkoutTagsScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(EditTextModal);

export default EditWorkoutTagsScreen;
