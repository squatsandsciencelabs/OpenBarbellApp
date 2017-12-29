import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditTextModal from 'app/shared_features/edit_set/EditTextModal';
import * as SuggestionsSelectors from 'app/redux/selectors/SuggestionsSelectors';
import * as Actions from './EditWorkoutCommentsActions';

const mapStateToProps = (state) => ({
    title: 'Edit Comments',
    placeholder: 'Enter Comment',
    text: '',
    multipleInput: true,
    setID: state.workout.editingCommentsSetID,
    inputs: state.workout.editingComments,
    generateMultipleInputSuggestions: (input, ignore) => { return SuggestionsSelectors.generateCommentsSuggestions(state, input, ignore) },
    isModalShowing: state.workout.editingCommentsSetID !== null
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveSetMultipleInput: Actions.saveComments,
        closeModal: Actions.dismissComments,
        cancelModal: Actions.cancelComments,
        tappedPill: Actions.tappedPill,
        addPill: Actions.addPill,
    }, dispatch);
};

const EditWorkoutCommentsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTextModal);

export default EditWorkoutCommentsScreen;
