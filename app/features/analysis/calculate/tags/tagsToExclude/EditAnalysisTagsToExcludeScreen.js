import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SelectTagsModal from '../SelectTagsModal';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as Actions from './EditAnalysisTagsToExcludeActions';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as OneRMCalculator from 'app/math/OneRMCalculator';

const mapStateToProps = (state) => {
    const exercise = AnalysisSelectors.getExercise(state);
    
    return {
        title: 'Tags Must Exclude',
        placeholder: 'Enter Tag',
        text: '',
        inputs: AnalysisSelectors.getTagsToExclude(state),
        generateSuggestions: (input, ignore) => OneRMCalculator.getTagsToExcludeSuggestions(state, exercise, input, ignore),
        isModalShowing: AnalysisSelectors.getIsEditingExcludeTags(state),
    }
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

const EditAnalysisTagsToExcludeScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectTagsModal);

export default EditAnalysisTagsToExcludeScreen;
