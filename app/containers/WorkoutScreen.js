// app/containers/WorkoutScreen.js

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WorkoutList from '../components/WorkoutList';
import * as SetActionCreators from '../actions/SetActionCreators';
import * as WorkoutActionCreators from '../actions/WorkoutActionCreators';
import { getWorkoutSets } from '../reducers/SetReducer';

const mapStateToProps = (state) => ({
	sets: getWorkoutSets(state.sets),
	filter: state.workout.filter
});

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		endSet: SetActionCreators.endSet,
		editWorkoutSet: WorkoutActionCreators.editWorkoutSet,
		endWorkout: WorkoutActionCreators.endWorkout,
		removeRep: SetActionCreators.removeWorkoutRep,
		restoreRep: SetActionCreators.restoreWorkoutRep
	}, dispatch);
};

const WorkoutScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(WorkoutList);

export default WorkoutScreen;
