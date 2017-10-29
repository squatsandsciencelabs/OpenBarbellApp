import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditTextModal from 'app/shared_features/edit_set/EditTextModal';
import * as SuggestionsSelectors from 'app/redux/selectors/SuggestionsSelectors';
import * as Actions from './EditHistoryTagsActions';

const mapStateToProps = (state) => ({
    title: 'Edit Tags',
    placeholder: 'Enter Tag',
    text: '',
    multipleInput: true,
    setID: state.history.editingTagsSetID,
    inputs: state.history.editingTags,
    generateMultipleInputSuggestions: (input, ignore) => { return SuggestionsSelectors.generateTagsSuggestions(state, input, ignore) },
    isModalShowing: state.history.editingTagsSetID !== null
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveSetMultipleInput: Actions.saveTags,
        closeModal: Actions.dismissTags,
        cancelTags: Actions.cancelTags,
        tappedPill: Actions.tappedPill,
    }, dispatch);
};

const EditHistoryTagsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTextModal);

export default EditHistoryTagsScreen;
