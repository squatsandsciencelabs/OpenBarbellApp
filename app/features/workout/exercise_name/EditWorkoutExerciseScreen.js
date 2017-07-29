import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditTextModal from 'app/shared_features/edit_set/EditTextModal';
import * as SuggestionsSelectors from 'app/redux/selectors/SuggestionsSelectors';
import * as Actions from './EditWorkoutExerciseActions';

const mapStateToProps = (state) => {
    // save the model
    let model = state.suggestions.exerciseModel;
    
    return {
        title: 'Edit Exercise',
        placeholder: 'Enter Exercise',
        text: state.workout.editingExerciseName,
        setID: state.workout.editingExerciseSetID,
        generateSuggestions: (input) => { return SuggestionsSelectors.generateSuggestions(model, input) },
        modalShowing: state.workout.editingExerciseSetID !== null
    };
};

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
