import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SelectTagsModal from 'app/shared_features/tags/SelectTagsModal';
import * as Actions from './EditHistoryFilterTagsToExcludeActions';
import * as HistorySelectors from 'app/redux/selectors/HistorySelectors';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

const mapStateToProps = (state) => {
    // TODO move tags suggestion out
    return {
        title: 'Tags to Exclude',
        placeholder: 'Enter Tag',
        text: '',
        inputs: HistorySelectors.getEditingFilterTagsToExclude(state),
        generateSuggestions: (input, ignore) => SetsSelectors.getHistoryFilterTagsToExcludeSuggestions(state, input, ignore),
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
