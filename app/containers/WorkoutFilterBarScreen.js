// app/container/WorkoutFilterBarScreen

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WorkoutFilterBar from '../components/WorkoutFilterBar';
import * as WorkoutActionCreators from '../actions/WorkoutActionCreators';

const mapStateToProps = (state) => ({
	filter: state.workout.filter,
});

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		filterAVGWorkout: WorkoutActionCreators.filterAVGWorkout,
		filterPKVWorkout: WorkoutActionCreators.filterPKVWorkout,
		filterPKHWorkout: WorkoutActionCreators.filterPKHWorkout,
		filterROMWorkout: WorkoutActionCreators.filterROMWorkout,
		filterDURWorkout: WorkoutActionCreators.filterDURWorkout,
	}, dispatch);
};

const WorkoutFilterBarScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(WorkoutFilterBar);

export default WorkoutFilterBarScreen;
