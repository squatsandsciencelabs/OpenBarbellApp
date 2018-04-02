import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SelectTagsModal from '../SelectTagsModal';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as Actions from './EditHistoryFilterTagsToExcludeActions';
import * as HistorySelectors from 'app/redux/selectors/HistorySelectors';
import * as OneRMCalculator from 'app/math/OneRMCalculator';

const mapStateToProps = (state) => {
    const exercise = HistorySelectors.getEditingExerciseName(state);
    
    // TODO move tags suggestion out
    return {
        title: 'Tags to Exclude',
        placeholder: 'Enter Tag',
        text: '',
        inputs: HistorySelectors.getEditingFilterTagsToExclude(state),
        generateSuggestions: (input, ignore) => OneRMCalculator.getTagsToExcludeSuggestions(state, exercise, input, ignore),
        isModalShowing: HistorySelectors.getIsEditingHistoryFilterTagsToExclude(state),
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

const EditHistoryFilterTagsToExcludeScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectTagsModal);

export default EditHistoryFilterTagsToExcludeScreen;
