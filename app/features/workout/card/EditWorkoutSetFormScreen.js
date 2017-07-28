import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditSetHeader from 'app/shared_features/set_card/EditSetHeader';
import * as SetActionCreators from 'app/redux/shared_actions/SetActionCreators';
import * as WorkoutActionCreators from 'app/redux/shared_actions/WorkoutActionCreators';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateSet: SetActionCreators.updateWorkoutSet,
        editExercise: WorkoutActionCreators.beginEditWorkoutExerciseName,
        editTags: WorkoutActionCreators.beginEditWorkoutTags,
    }, dispatch);
};

const EditWorkoutSetFormScreen = connect(
    null,
    mapDispatchToProps
)(EditSetHeader);

export default EditWorkoutSetFormScreen;
