// app/containers/EditHistorySetScreen.js

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EditSetModal from '../components/EditSetModal';
import * as SetActionCreators from '../actions/SetActionCreators';
import * as HistoryActionCreators from '../actions/HistoryActionCreators';
import { getEditHistorySet } from '../reducers/SetReducer';

const mapStateToProps = (state) => {
	let setID = state.history.editingSetID;
	let set = getEditHistorySet(state.sets, setID);

	return {
		modalShowing: state.history.editing,
		set: set,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		updateSet: SetActionCreators.updateHistorySet,
		closeModal: HistoryActionCreators.endEditHistorySet,
	}, dispatch);
};

const EditHistorySetScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(EditSetModal);

export default EditHistorySetScreen;
