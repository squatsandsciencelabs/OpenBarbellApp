import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditTextModal from 'app/shared_features/edit_set/EditTextModal';
import * as SetActionCreators from 'app/redux/shared_actions/SetActionCreators';
import * as HistoryActionCreators from 'app/redux/shared_actions/HistoryActionCreators';
import * as SuggestionsSelector from 'app/redux/selectors/SuggestionsSelectors';

const mapStateToProps = (state) => {
    // save the model
    let model = state.suggestions.exerciseModel;
    
    return {
        title: 'Edit Exercise',
        placeholder: 'Enter Exercise',
        text: state.history.editingExercise,
        setID: state.history.editingExerciseSetID,
        generateSuggestions: (input) => { return SuggestionsSelector.generateSuggestions(model, input) },
        modalShowing: state.history.editingExerciseSetID !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateSetSingle: SetActionCreators.updateHistorySet,
        closeModal: HistoryActionCreators.endEditHistoryExerciseName,
    }, dispatch);
};

const EditHistoryExerciseScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTextModal);

export default EditHistoryExerciseScreen;
