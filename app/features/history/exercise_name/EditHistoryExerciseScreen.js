import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditTextModal from 'app/shared_features/edit_set/EditTextModal';
import * as SuggestionsSelector from 'app/redux/selectors/SuggestionsSelectors';
import * as Actions from './EditHistoryExerciseActions';

const mapStateToProps = (state) => {
    // save the model
    let model = state.suggestions.exerciseModel;
    
    return {
        title: 'Edit Exercise',
        placeholder: 'Enter Exercise',
        text: state.history.editingExerciseName,
        setID: state.history.editingExerciseSetID,
        generateSuggestions: (input) => { return SuggestionsSelector.generateSuggestions(model, input) },
        modalShowing: state.history.editingExerciseSetID !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveSetSingleInput: Actions.saveExerciseName,
        closeModal: Actions.dismissExercise,
    }, dispatch);
};

const EditHistoryExerciseScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTextModal);

export default EditHistoryExerciseScreen;
