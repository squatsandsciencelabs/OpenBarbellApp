import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditTextModal from 'app/shared_features/edit_set/EditTextModal';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as SuggestionsSelectors from 'app/redux/selectors/SuggestionsSelectors';
import * as Actions from './OneRMEditSetTagsActions';

const mapStateToProps = (state) => {
    const setID = AnalysisSelectors.getEditingTagsSetID(state);

    return {
        title: 'Edit Tags',
        placeholder: 'Enter Tag',
        text: '',
        multipleInput: true,
        setID: setID,
        inputs: AnalysisSelectors.getEditingTags(state),
        generateMultipleInputSuggestions: (input, ignore) => { return SuggestionsSelectors.generateTagsSuggestions(state, input, ignore) },
        isModalShowing: setID !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveSetMultipleInput: Actions.saveTags,
        closeModal: Actions.dismissTags,
        cancelModal: Actions.cancelTags,
        tappedPill: Actions.tappedPill,
        addPill: Actions.addPill,
    }, dispatch);
};

const OneRMEditSetTagsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTextModal);

export default OneRMEditSetTagsScreen;
