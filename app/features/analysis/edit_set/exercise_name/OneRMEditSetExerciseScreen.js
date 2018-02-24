import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditTextModal from 'app/shared_features/edit_set/EditTextModal';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as SuggestionsSelectors from 'app/redux/selectors/SuggestionsSelectors';
import * as Actions from './OneRMEditSetExerciseActions';

const mapStateToProps = (state) => {
    const setID = AnalysisSelectors.getEditingExerciseSetID(state);

    return {
        title: 'Edit Exercise',
        placeholder: 'Enter Exercise',
        text: AnalysisSelectors.getEditingExerciseName(state),
        setID: setID,
        generateSingleInputSuggestions: (input) => { return SuggestionsSelectors.generateExerciseNameSuggestions(state, input) },
        isModalShowing: setID !== null,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveSetSingleInput: Actions.saveExerciseName,
        closeModal: Actions.dismissExercise,
        cancelModal: Actions.cancelExercise,
    }, dispatch);
};

const OneRMEditSetExerciseScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTextModal);

export default OneRMEditSetExerciseScreen;
