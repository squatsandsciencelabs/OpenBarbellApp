import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditTextModal from 'app/shared_features/edit_set/EditTextModal';
import * as SetActionCreators from 'app/redux/shared_actions/SetActionCreators';
import * as HistoryActionCreators from 'app/redux/shared_actions/HistoryActionCreators';
import * as SuggestionsSelectors from 'app/redux/selectors/SuggestionsSelectors';

const mapStateToProps = (state) => {
    // save the model
    let model = state.suggestions.tagsModel;

    return {
        title: 'Edit Tags',
        placeholder: 'Enter Tag',
        text: '',
        multipleInput: true,
        setID: state.history.editingTagsSetID,
        inputs: state.history.editingTags,
        generateSuggestions: (input, ignore) => { return SuggestionsSelectors.generateSuggestions(model, input, ignore) },
        modalShowing: state.history.editingTagsSetID !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateSetMultiple: SetActionCreators.updateHistorySetTags,
        closeModal: HistoryActionCreators.endEditHistoryTags,
    }, dispatch);
};

const EditHistoryTagsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTextModal);

export default EditHistoryTagsScreen;
