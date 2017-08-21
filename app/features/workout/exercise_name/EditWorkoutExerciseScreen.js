import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditTextModal from 'app/shared_features/edit_set/EditTextModal';
import * as WorkoutSelectors from 'app/redux/selectors/WorkoutSelectors';
import * as SuggestionsSelectors from 'app/redux/selectors/SuggestionsSelectors';
import * as Actions from './EditWorkoutExerciseActions';

const mapStateToProps = (state) => ({
    title: 'Edit Exercise',
    placeholder: 'Enter Exercise',
    text: WorkoutSelectors.getEditingExerciseName(state),
    setID: WorkoutSelectors.getEditingExerciseSetID(state),
    bias: WorkoutSelectors.getEditingExerciseBias(state),
    generateSingleInputSuggestions: (input, bias) => { return SuggestionsSelectors.generateExerciseNameSuggestions(state, input, bias) },
    modalShowing: state.workout.editingExerciseSetID !== null
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveSetSingleInput: Actions.saveExerciseName,
        closeModal: Actions.dismissExercise,
    }, dispatch);
};

const EditWorkoutExerciseScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTextModal);

export default EditWorkoutExerciseScreen;
