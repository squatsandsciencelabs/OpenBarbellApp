// app/container/HistorySetExpandedScreen

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SetExpandedView from '../components/SetExpandedView';
import * as HistoryActionCreators from '../actions/HistoryActionCreators';
import * as SetReducer from '../reducers/SetReducer';
import * as RepDataMap from '../utility/RepDataMap';

const mapStateToProps = (state) => {
	if (state.history.expandedSetID !== null) {
		var set = SetReducer.getExpandedHistorySet(state.sets, state.history.expandedSetID);
		var repNum = 0;
		var vms = set.reps.map((rep) => {
			repNum++;
			let data = rep.data;

			var duration = RepDataMap.durationOfLift(data)
			if (duration !== null) {
				duration = (duration / 1000000.0).toFixed(2);
			} else {
				duration = "obv2 only";
			}

			return {
				key: "rep"+repNum,
				removed: rep.removed,
				values: [
					repNum,
					RepDataMap.averageVelocity(data),
					RepDataMap.peakVelocity(data),
					RepDataMap.peakVelocityLocation(data),
					RepDataMap.rangeOfMotion(data),
					duration,
				]
			};
		});
	}

	return {
		visible: state.history.expandedSetID !== null,
		rows: vms
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
