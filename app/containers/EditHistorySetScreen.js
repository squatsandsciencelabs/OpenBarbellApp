// app/containers/EditHistorySetScreen.js

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EditSetHeader from '../components/EditSetHeader';
import * as SetActionCreators from '../actions/SetActionCreators';
import * as SuggestionsActionCreators from '../actions/SuggestionsActionCreators';
import * as SuggestionsReducer from '../reducers/SuggestionsReducer';

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		updateSet: SetActionCreators.updateHistorySet,
		editExercise: SuggestionsActionCreators.beginEditHistoryExerciseName,
	}, dispatch);
};

const EditHistorySetScreen = connect(
	null,
	mapDispatchToProps
)(EditSetHeader);

export default EditHistorySetScreen;
