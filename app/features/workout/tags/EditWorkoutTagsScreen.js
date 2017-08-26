import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditTextModal from 'app/shared_features/edit_set/EditTextModal';
import * as SuggestionsSelectors from 'app/redux/selectors/SuggestionsSelectors';
import * as Actions from './EditWorkoutTagsActions';

const mapStateToProps = (state) => ({
    title: 'Edit Tags',
    placeholder: 'Enter Tag',
    text: '',
    multipleInput: true,
    setID: state.workout.editingTagsSetID,
    inputs: state.workout.editingTags,
    generateMultipleInputSuggestions: (input, ignore) => { return SuggestionsSelectors.generateTagsSuggestions(state, input, ignore) },
    isModalShowing: state.workout.editingTagsSetID !== null
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveSetMultipleInput: Actions.saveTags,
        closeModal: Actions.dismissTags,
    }, dispatch);
};

const EditWorkoutTagsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTextModal);

export default EditWorkoutTagsScreen;
