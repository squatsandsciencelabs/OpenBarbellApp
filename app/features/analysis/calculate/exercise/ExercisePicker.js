import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PickerModal from 'app/shared_features/picker/PickerModal';
import * as Actions from './ExercisePickerActions';

import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';

const mapStateToProps = (state) => ({
    isModalShowing: AnalysisSelectors.getIsEditing1RMExercise(state),
    items: SetsSelectors.generateExerciseItems(state),
    selectedValue: AnalysisSelectors.getAnalysisE1RMExercise(state)
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectValue: Actions.saveSelected1RMExercise,
        closeModal: Actions.dismissSelectExercise
    }, dispatch);
};

const ExercisePicker = connect(
    mapStateToProps,
    mapDispatchToProps
)(PickerModal);

export default ExercisePicker;
