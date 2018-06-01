import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import EditHistoryFilterView from './EditHistoryFilterView';
import * as Actions from './EditHistoryFilterActions';
import * as HistorySelectors from 'app/redux/selectors/HistorySelectors';

const mapStateToProps = (state) => {
    const startDate = HistorySelectors.getEditingHistoryFilterStartingDate(state);
    const formattedStartDate = startDate ? moment(startDate).format('MM/DD/YYYY') : null;

    const endDate = HistorySelectors.getEditingHistoryFilterEndingDate(state);
    const formattedEndDate = endDate ? moment(endDate).format('MM/DD/YYYY') : null;

    return {
        isModalShowing: HistorySelectors.getShowHistoryFilter(state),
        exercise: HistorySelectors.getEditingFilterExerciseName(state),
        tagsToInclude: HistorySelectors.getEditingFilterTagsToInclude(state),
        tagsToExclude: HistorySelectors.getEditingFilterTagsToExclude(state),
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        startWeight: HistorySelectors.getEditingHistoryFilterStartingWeight(state),
        endWeight: HistorySelectors.getEditingHistoryFilterEndingWeight(state),
        startRPE: HistorySelectors.getEditingHistoryFilterStartingRPE(state),
        endRPE: HistorySelectors.getEditingHistoryFilterEndingRPE(state),
        startingRepRange: HistorySelectors.getEditingHistoryFilterStartingRepRange(state),
        endingRepRange: HistorySelectors.getEditingHistoryFilterEndingRepRange(state),
        startWeightMetric: HistorySelectors.getEditingHistoryFilterStartingWeightMetric(state),
        endWeightMetric: HistorySelectors.getEditingHistoryFilterEndingWeightMetric(state),
        showRemoved: HistorySelectors.getEditingShowRemoved(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        closeModal: Actions.dismissHistoryFilter,
        tappedExercise: Actions.presentSelectExercise,
        tappedTagsToInclude: Actions.presentTagsToInclude,
        tappedTagsToExclude: Actions.presentTagsToExclude,
        tappedStartDate: Actions.presentStartDate,
        tappedEndDate: Actions.presentEndDate,
        updateStartRPE: Actions.updateStartRPE,
        updateEndRPE: Actions.updateEndRPE,
        updateStartingRepRange: Actions.updateStartingRepRange,
        updateEndingRepRange: Actions.updateEndingRepRange,
        updateStartWeight: Actions.updateStartWeight,
        updateEndWeight: Actions.updateEndWeight,
        clear: Actions.clearHistoryFilter,
        save: Actions.saveHistoryFilter,
        toggleStartWeightMetric: Actions.toggleStartWeightMetric,
        toggleEndWeightMetric: Actions.toggleEndWeightMetric,
        toggleShowRemoved: Actions.toggleShowRemoved,
        clearStartDate: Actions.clearStartDate,
        clearEndDate: Actions.clearEndDate,
    }, dispatch);
};

const EditHistoryFilterScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditHistoryFilterView);

export default EditHistoryFilterScreen;
