import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SelectTagsModal from '../SelectTagsModal';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as Actions from './EditAnalysisTagsToIncludeActions';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';

const mapStateToProps = (state) => {
    const e1RMExercise = AnalysisSelectors.getAnalysisE1RMExercise(state);

    return {
        title: 'Tags to Include',
        placeholder: 'Enter Tag',
        text: '',
        inputs: AnalysisSelectors.getTagsToInclude(state),
        generateSuggestions: SetsSelectors.getTagsToIncludeSuggestions(state, e1RMExercise),
        isModalShowing: AnalysisSelectors.getIsEditingIncludeTags(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        save: Actions.saveTags,
        closeModal: Actions.cancelTags,
        cancelModal: Actions.cancelTags,
        tappedPill: Actions.tappedPill,
        addPill: Actions.addPill,
    }, dispatch);
};

const EditAnalysisTagsToIncludeScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectTagsModal);

export default EditAnalysisTagsToIncludeScreen;
