import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SelectTagsModal from '../SelectTagsModal';
import * as Actions from './EditHistoryFilterTagsToIncludeActions';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as OneRMCalculator from 'app/math/OneRMCalculator';

const mapStateToProps = (state) => {
    const exercise = AnalysisSelectors.getExercise(state);

    return {
        title: 'Tags Must Include',
        placeholder: 'Enter Tag',
        text: '',
        inputs: AnalysisSelectors.getTagsToInclude(state),
        generateSuggestions: (input, ignore) => OneRMCalculator.getTagsToIncludeSuggestions(state, exercise, input, ignore),
        isModalShowing: AnalysisSelectors.getIsEditingIncludeTags(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        save: Actions.saveTags,
        closeModal: Actions.dismissTags,
        cancelModal: Actions.cancelTags,
        tappedPill: Actions.tappedPill,
        addPill: Actions.addPill,
    }, dispatch);
};

const EditHistoryFilterTagsToIncludeScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectTagsModal);

export default EditHistoryFilterTagsToIncludeScreen;
