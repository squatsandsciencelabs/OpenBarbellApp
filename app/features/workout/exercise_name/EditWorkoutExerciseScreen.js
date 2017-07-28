import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditTextModal from 'app/shared_features/edit_set/EditTextModal';
import * as SetActionCreators from 'app/redux/shared_actions/SetActionCreators';
import * as WorkoutActionCreators from 'app/redux/shared_actions/WorkoutActionCreators';
import * as SuggestionsSelectors from 'app/redux/selectors/SuggestionsSelectors';

const mapStateToProps = (state) => {
    // save the model
    let model = state.suggestions.exerciseModel;
    
    return {
        title: 'Edit Exercise',
        placeholder: 'Enter Exercise',
        text: state.workout.editingExercise,
        setID: state.workout.editingExerciseSetID,
        generateSuggestions: (input) => { return SuggestionsSelectors.generateSuggestions(model, input) },
        modalShowing: state.workout.editingExerciseSetID !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateSetSingle: SetActionCreators.updateWorkoutSet,
        closeModal: WorkoutActionCreators.endEditWorkoutExerciseName,
    }, dispatch);
};

const EditWorkoutExerciseScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTextModal);

export default EditWorkoutExerciseScreen;
