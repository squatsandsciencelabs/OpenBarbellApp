import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditTagsModal from '../edit_tags/EditTagsModal';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as Actions from './EditAnalysisTagsToExcludeActions';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';

const mapStateToProps = (state) => {
    const e1RMExercise = AnalysisSelectors.getAnalysisE1RMExercise(state);
    
    return {
        title: 'Tags to Exclude',
        placeholder: 'Enter Tag',
        text: '',
        multipleInput: true,
        inputs: AnalysisSelectors.getTagsToExclude(state),
        generateMultipleInputSuggestions: SetsSelectors.getExerciseAllTagsExcludes(state, e1RMExercise),
        isModalShowing: AnalysisSelectors.getIsEditingExcludeTags(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveSetMultipleInput: Actions.saveTags,
        closeModal: Actions.cancelTags,
        cancelModal: Actions.cancelTags,
        tappedPill: Actions.tappedPill,
        addPill: Actions.addPill,
    }, dispatch);
};

const EditAnalysisTagsToExcludeScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTagsModal);

export default EditAnalysisTagsToExcludeScreen;
