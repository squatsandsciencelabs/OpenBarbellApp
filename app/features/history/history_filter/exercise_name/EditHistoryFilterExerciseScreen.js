import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditTextModal from 'app/shared_features/edit_set/EditTextModal';
import * as SuggestionsSelectors from 'app/redux/selectors/SuggestionsSelectors';
import * as HistorySelectors from 'app/redux/selectors/HistorySelectors';
import * as Actions from './EditHistoryFilterExerciseActions';

const mapStateToProps = (state) => ({
    title: 'Edit Exercise',
    placeholder: 'Enter Exercise',
    text: HistorySelectors.getEditingFilterExerciseName(state),
    generateSingleInputSuggestions: (input) => { return SuggestionsSelectors.generateExerciseNameSuggestions(state, input) },
    isModalShowing: HistorySelectors.getIsEditingHistoryFilterExercise(state),
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveSetSingleInput: Actions.saveExerciseName,
        closeModal: Actions.dismissExercise,
        cancelModal: Actions.cancelExercise,
    }, dispatch);
};

const EditHistoryFilterExerciseScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTextModal);

export default EditHistoryFilterExerciseScreen;
