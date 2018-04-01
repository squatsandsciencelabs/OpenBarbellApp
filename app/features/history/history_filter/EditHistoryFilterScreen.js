import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditHistoryFilterView from './EditHistoryFilterView';
import * as Actions from './EditHistoryFilterActions';
import * as HistorySelectors from 'app/redux/selectors/HistorySelectors';

// REFACTOR as selector When historyfilter is approved
const mapStateToProps = (state) => ({
    isModalShowing: HistorySelectors.getShowHistoryFilter(state),
    exercise: HistorySelectors.getHistoryFilterExercise(state),
    tagsToInclude: HistorySelectors.getHistoryFilterTagsToInclude(state),
    tagsToExclude: HistorySelectors.getHistoryFilterTagsToExclude(state),
    startDate: HistorySelectors.getHistoryFilterStartingDate(state),
    endDate: HistorySelectors.getHistoryFilterEndingDate(state),
    startWeight: HistorySelectors.getHistoryFilterStartingWeight(state),
    endWeight: HistorySelectors.getHistoryFilterEndingWeight(state),
    startingRPE: HistorySelectors.getHistoryFilterStartingRPE(state),
    endingRPE: HistorySelectors.getHistoryFilterEndingRPE(state),
    startingRepRange: HistorySelectors.getHistoryFilterStartingRepRange(state),
    endingRepRange: HistorySelectors.getHistoryFilterEndingRepRange(state),
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        closeModal: Actions.dismissHistoryFilter,
        tappedExercise: Actions.presentSelectExercise,
    }, dispatch);
};

const EditHistoryFilterScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditHistoryFilterView);

export default EditHistoryFilterScreen;
