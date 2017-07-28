import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditTextModal from 'app/shared_features/edit_set/EditTextModal';
import * as SetActionCreators from 'app/redux/shared_actions/SetActionCreators';
import * as WorkoutActionCreators from 'app/redux/shared_actions/WorkoutActionCreators';
import * as SuggestionsSelectors from 'app/redux/selectors/SuggestionsSelectors';

const mapStateToProps = (state) => {
    // save the model
    let model = state.suggestions.tagsModel;
    
    return {
        title: 'Edit Tags',
        placeholder: 'Enter Tag',
        text: '',
        multipleInput: true,
        setID: state.workout.editingTagsSetID,
        inputs: state.workout.editingTags,
        generateSuggestions: (input, ignore) => { return SuggestionsSelectors.generateSuggestions(model, input, ignore) },
        modalShowing: state.workout.editingTagsSetID !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateSetMultiple: SetActionCreators.updateWorkoutSetTags,
        closeModal: WorkoutActionCreators.endEditWorkoutTags,
    }, dispatch);
};

const EditWorkoutTagsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTextModal);

export default EditWorkoutTagsScreen;
