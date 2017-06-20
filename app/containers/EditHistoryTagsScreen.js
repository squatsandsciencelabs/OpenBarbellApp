// app/containers/EditHistoryTagsScreen.js

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EditTextModal from '../components/EditTextModal';
import * as SetActionCreators from '../actions/SetActionCreators';
import * as HistoryActionCreators from '../actions/HistoryActionCreators';
import * as SuggestionsReducer from '../reducers/SuggestionsReducer';

const mapStateToProps = (state) => {
	// save the model
	let model = state.suggestions.tagsModel;
	
	return {
        title: 'Edit Tags',
		placeholder: 'Enter Tag',
		text: '',
		multipleInput: true,
		setID: state.history.editingTagsSetID,
		generateSuggestions: (input) => { return SuggestionsReducer.generateSuggestions(input, model) },
        modalShowing: state.history.editingTagsSetID !== null
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		updateSetSingle: SetActionCreators.updateHistorySet,
		updateSetMultiple: SetActionCreators.updateHistorySetTags,
        closeModal: HistoryActionCreators.endEditHistoryTags,
	}, dispatch);
};

const EditHistoryTagsScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(EditTextModal);

export default EditHistoryTagsScreen;
