import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditTextModal from 'app/shared_features/edit_set/EditTextModal';
import * as SuggestionsSelectors from 'app/redux/selectors/SuggestionsSelectors';
import * as Actions from './EditHistoryCommentsActions';

const mapStateToProps = (state) => ({
    title: 'Edit Comments',
    placeholder: 'Enter Comment',
    message: 'This information is not used for 1RM calculations. Important exercise information should be put in the "Exercise" field.',
    text: '',
    multipleInput: true,
    setID: state.history.editingCommentsSetID,
    inputs: state.history.editingComments,
    generateMultipleInputSuggestions: (input, ignore) => { return SuggestionsSelectors.generateCommentsSuggestions(state, input, ignore) },
    isModalShowing: state.history.editingCommentsSetID !== null
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

const EditHistoryCommentsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTextModal);

export default EditHistoryCommentsScreen;
