import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditHistoryFilterView from './EditHistoryFilterView';
import * as Actions from './EditHistoryFilterActions';
import * as HistorySelectors from 'app/redux/selectors/HistorySelectors';

const mapStateToProps = (state) => {
    const months = {
        "January": "Jan",
        "February": "Feb",
        "March": "Mar",
        "April": "Apr",
        "May": "May",
        "June": "Jun",
        "July": "Jul",
        "August": "Aug",
        "September": "Sep",
        "October": "Oct",
        "November": "Nov",
        "December": "Dec",
    };

    const startDate = HistorySelectors.getEditingHistoryFilterStartingDate(state);
    let formattedStartDate = null;

    if (startDate) {
        const startMonth = startDate.substring(0, startDate.indexOf(" "));
        const shortStartMonth = months[startMonth];
        formattedStartDate = shortStartMonth + " " + startDate.substring(startDate.indexOf(" ") + 1, startDate.indexOf(' at'));
    }

    const endDate = HistorySelectors.getEditingHistoryFilterEndingDate(state);
    let formattedendDate = null;

    if (endDate) {
        const endMonth = endDate.substring(0, endDate.indexOf(" "));
        const shortendMonth = months[endMonth];
        formattedendDate = shortendMonth + " " + endDate.substring(endDate.indexOf(" ") + 1, endDate.indexOf(' at'));
    }

    return {
        isModalShowing: HistorySelectors.getShowHistoryFilter(state),
        exercise: HistorySelectors.getEditingExerciseName(state),
        tagsToInclude: HistorySelectors.getEditingFilterTagsToInclude(state),
        tagsToExclude: HistorySelectors.getEditingFilterTagsToExclude(state),
        startDate: formattedStartDate,
        endDate: formattedendDate,
        startWeight: HistorySelectors.getEditingHistoryFilterStartingWeight(state),
        endWeight: HistorySelectors.getEditingHistoryFilterEndingWeight(state),
        startRPE: HistorySelectors.getEditingHistoryFilterStartingRPE(state),
        endRPE: HistorySelectors.getEditingHistoryFilterEndingRPE(state),
        startingRepRange: HistorySelectors.getEditingHistoryFilterStartingRepRange(state),
        endingRepRange: HistorySelectors.getEditingHistoryFilterEndingRepRange(state),
        startWeightMetric: HistorySelectors.getHistoryFilterStartingWeightMetric(state),
        endWeightMetric: HistorySelectors.getHistoryFilterEndingWeightMetric(state),
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
        clearStartDate: Actions.clearStartDate,
        clearEndDate: Actions.clearEndDate,
    }, dispatch);
};

const EditHistoryFilterScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditHistoryFilterView);

export default EditHistoryFilterScreen;
