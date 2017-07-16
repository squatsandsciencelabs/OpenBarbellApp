// app/container/HistorySetExpandedScreen

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SetExpandedView from '../components/SetExpandedView';
import * as HistoryActionCreators from '../actions/HistoryActionCreators';
import * as SetReducer from '../reducers/SetReducer';

const mapStateToProps = (state) => {
	if (state.history.expandedSetID !== null) {
		var set = SetReducer.getExpandedHistorySet(state.sets, state.history.expandedSetID);
		var reps = set.reps;
	}

	return {
		visible: state.history.expandedSetID !== null,
		reps: reps
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		closeModal: HistoryActionCreators.endViewExpandedSet,
	}, dispatch);
};
 
const HistorySetExpandedScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(SetExpandedView);

export default HistorySetExpandedScreen;
