import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SelectTagsModal from '../SelectTagsModal';
import * as Actions from './EditHistoryFilterTagsToIncludeActions';
import * as HistorySelectors from 'app/redux/selectors/HistorySelectors';
import * as OneRMCalculator from 'app/math/OneRMCalculator';

const mapStateToProps = (state) => {
    const exercise = HistorySelectors.getEditingExerciseName(state);
    
    // TODO move tags suggestion out
    return {
        title: 'Tags to Include',
        placeholder: 'Enter Tag',
        text: '',
        inputs: HistorySelectors.getEditingFilterTagsToInclude(state),
        generateSuggestions: (input, ignore) => OneRMCalculator.getTagsToIncludeSuggestions(state, exercise, input, ignore),
        isModalShowing: HistorySelectors.getIsEditingHistoryFilterTagsToInclude(state),
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

const EditHistoryFilterTagsToIncludeScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectTagsModal);

export default EditHistoryFilterTagsToIncludeScreen;
