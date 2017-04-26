// app/container/HistoryFilterBarScreen

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HistoryFilterBar from '../components/HistoryFilterBar';
import * as HistoryActionCreators from '../actions/HistoryActionCreators';

const mapStateToProps = (state) => ({
	shouldShowRemoved: state.history.showRemoved,
});

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		showRemoved: HistoryActionCreators.showRemovedData,
        hideRemoved: HistoryActionCreators.hideRemovedData,
		exportCSV: HistoryActionCreators.exportHistoryCSV,
	}, dispatch);
};

const HistoryFilterBarScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(HistoryFilterBar);

export default HistoryFilterBarScreen;
