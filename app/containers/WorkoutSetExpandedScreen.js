// app/container/WorkoutSetExpandedScreen

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SetExpandedView from '../components/SetExpandedView';
import * as WorkoutActionCreators from '../actions/WorkoutActionCreators';
import * as SetReducer from '../reducers/SetReducer';
import * as RepDataMap from '../utility/RepDataMap';

const mapStateToProps = (state) => {
	if (state.workout.expandedSetID !== null) {
		var set = SetReducer.getExpandedWorkoutSet(state.sets, state.workout.expandedSetID);
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
		visible: state.workout.expandedSetID !== null,
		rows: vms
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		closeModal: WorkoutActionCreators.endViewExpandedSet,
	}, dispatch);
};
 
const WorkoutSetExpandedScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(SetExpandedView);

export default WorkoutSetExpandedScreen;
