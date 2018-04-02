import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditHistoryFilterView from './EditHistoryFilterView';
import * as Actions from './EditHistoryFilterActions';
import * as HistorySelectors from 'app/redux/selectors/HistorySelectors';

// REFACTOR as selector When historyfilter is approved
const mapStateToProps = (state) => ({
    isModalShowing: HistorySelectors.getShowHistoryFilter(state),
    exercise: HistorySelectors.getEditingExerciseName(state),
    tagsToInclude: HistorySelectors.getEditingFilterTagsToInclude(state),
    tagsToExclude: HistorySelectors.getEditingFilterTagsToExclude(state),
    startDate: HistorySelectors.getEditingHistoryFilterStartingDate(state),
    endDate: HistorySelectors.getEditingHistoryFilterEndingDate(state),
    startWeight: HistorySelectors.getEditingHistoryFilterStartingWeight(state),
    endWeight: HistorySelectors.getEditingHistoryFilterEndingWeight(state),
    startingRPE: HistorySelectors.getEditingHistoryFilterStartingRPE(state),
    endingRPE: HistorySelectors.getEditingHistoryFilterEndingRPE(state),
    startingRepRange: HistorySelectors.getEditingHistoryFilterStartingRepRange(state),
    endingRepRange: HistorySelectors.getEditingHistoryFilterEndingRepRange(state),
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        closeModal: Actions.dismissHistoryFilter,
        tappedExercise: Actions.presentSelectExercise,
        tappedTagsToInclude: Actions.presentTagsToInclude,
        tappedTagsToExclude: Actions.presentTagsToExclude,
        tappedStartDate: Actions.presentStartDate,
        tappedEndDate: Actions.presentEndDate,
    }, dispatch);
};

const EditHistoryFilterScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditHistoryFilterView);

export default EditHistoryFilterScreen;
