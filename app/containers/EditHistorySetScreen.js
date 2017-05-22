// app/containers/EditHistorySetScreen.js

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EditSetHeader from '../components/EditSetHeader';
import * as SetActionCreators from '../actions/SetActionCreators';
import * as SuggestionsReducer from '../reducers/SuggestionsReducer';

const mapStateToProps = (state) => {
	// save the model
	let model = state.suggestions.exerciseModel;
	
	return {
		generateSuggestions: (input) => { return SuggestionsReducer.generateSuggestions(input, model) }
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		updateSet: SetActionCreators.updateHistorySet,
	}, dispatch);
};

const EditHistorySetScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(EditSetHeader);

export default EditHistorySetScreen;
